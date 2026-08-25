const allowedEvents = new Set(["wedding", "birthday", "kids", "business", "anniversary", "baby"]);
const defaultLeadsEmail = "radiksun@list.ru";
const rateWindowMs = 10 * 60 * 1000;
const rateLimit = 5;
const attempts = new Map<string, number[]>();
const recentlySeen = new Map<string, number>();

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let activeId = "";
  try {
    const requestUrl = new URL(request.url);
    const origin = request.headers.get("origin");
    if (origin && origin !== requestUrl.origin) return Response.json({ error: "invalid_origin" }, { status: 403 });
    const clientKey = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const recent = (attempts.get(clientKey) || []).filter(value => now - value < rateWindowMs);
    if (recent.length >= rateLimit) return Response.json({ error: "rate_limited" }, { status: 429, headers: { "retry-after": "600" } });
    recent.push(now); attempts.set(clientKey, recent);

    const data = await request.json() as Record<string, unknown>;
    if (clean(data.website, 100)) return Response.json({ ok: true });

    const eventType = clean(data.eventType, 30);
    const name = clean(data.name, 120);
    const contact = clean(data.contact, 180);
    if (!allowedEvents.has(eventType) || name.length < 2 || contact.length < 3 || data.consent !== true) {
      return Response.json({ error: "invalid_request" }, { status: 400 });
    }

    const modules = Array.isArray(data.modules)
      ? data.modules.map((item) => clean(item, 60)).filter(Boolean).slice(0, 12)
      : [];
    const id = clean(data.idempotencyKey, 80) || crypto.randomUUID();
    activeId = id;
    for (const [key, expiresAt] of recentlySeen) if (expiresAt <= now) recentlySeen.delete(key);
    if (recentlySeen.has(id)) return Response.json({ ok: true, id, duplicate: true });
    recentlySeen.set(id, now + 24 * 60 * 60 * 1000);
    const values = {
      id, createdAt: now, eventType, name, contact, eventDate: clean(data.eventDate, 30), city: clean(data.city, 120),
      guestCount: Math.max(0, Math.min(100000, Number(data.guestCount) || 0)), budget: clean(data.budget, 80),
      selectedStyle: clean(data.selectedStyle, 100), modules: JSON.stringify(modules), musicMood: clean(data.musicMood, 100),
      message: clean(data.message, 2000), source: clean(data.source, 80) || "website",
    };
    const databaseUrl = process.env.DATABASE_URL;
    let stored = false;
    let duplicate = false;
    if (databaseUrl) {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(databaseUrl);
      await sql`CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, created_at BIGINT NOT NULL, event_type TEXT NOT NULL, name TEXT NOT NULL, contact TEXT NOT NULL, event_date TEXT, city TEXT, guest_count INTEGER, budget TEXT, selected_style TEXT, modules TEXT, music_mood TEXT, message TEXT, source TEXT, notify_status TEXT NOT NULL DEFAULT 'pending')`;
      const inserted = await sql`INSERT INTO leads (id, created_at, event_type, name, contact, event_date, city, guest_count, budget, selected_style, modules, music_mood, message, source, notify_status) VALUES (${values.id}, ${values.createdAt}, ${values.eventType}, ${values.name}, ${values.contact}, ${values.eventDate}, ${values.city}, ${values.guestCount}, ${values.budget}, ${values.selectedStyle}, ${values.modules}, ${values.musicMood}, ${values.message}, ${values.source}, 'pending') ON CONFLICT (id) DO NOTHING RETURNING id`;
      stored = inserted.length > 0;
      duplicate = !stored;
      if (duplicate) return Response.json({ ok: true, id, duplicate: true });
    }
    const lines = [
      "Новая заявка · ПРЕДВКУСИЕ",
      `Повод: ${eventType}`,
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      `Дата / город: ${clean(data.eventDate, 30) || "—"} · ${clean(data.city, 120) || "—"}`,
      `Гостей: ${values.guestCount || "—"}`,
      `Бюджет: ${clean(data.budget, 80) || "—"}`,
      `Стиль: ${clean(data.selectedStyle, 100) || "—"}`,
      `Модули: ${modules.join(", ") || "—"}`,
      `Сообщение: ${clean(data.message, 2000) || "—"}`,
    ];
    const message = lines.join("\n");
    const leadsEmail = process.env.LEADS_EMAIL || defaultLeadsEmail;
    const emailPayload = {
      _subject: `Новая заявка · ПРЕДВКУСИЕ · ${name}`,
      _template: "table",
      _captcha: "false",
      Повод: eventType,
      Имя: name,
      Контакт: contact,
      Дата: clean(data.eventDate, 30) || "Не указана",
      Город: clean(data.city, 120) || "Не указан",
      Гостей: Math.max(0, Math.min(100000, Number(data.guestCount) || 0)) || "Не указано",
      Бюджет: clean(data.budget, 80) || "Не указан",
      Стиль: clean(data.selectedStyle, 100) || "Не указан",
      Дополнения: modules.join(", ") || "Не указаны",
      Сообщение: clean(data.message, 2000) || "Нет сообщения",
    };
    const deliveries: Promise<boolean>[] = [
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(leadsEmail)}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          origin: "https://predvkushenie.vercel.app",
          referer: "https://predvkushenie.vercel.app/order",
        },
        body: JSON.stringify(emailPayload),
        signal: AbortSignal.timeout(8000),
      }).then(response => response.ok).catch(() => false),
    ];

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      deliveries.push(fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
        signal: AbortSignal.timeout(8000),
      }).then(response => response.ok).catch(() => false));
    }
    const delivered = (await Promise.all(deliveries)).some(Boolean);
    if (databaseUrl && stored) {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(databaseUrl);
      await sql`UPDATE leads SET notify_status = ${delivered ? "sent" : "failed"} WHERE id = ${id}`;
    }
    if (!stored && !delivered) { recentlySeen.delete(id); return Response.json({ error: "notification_failed" }, { status: 502 }); }

    return Response.json({ ok: true, id, stored, notified: delivered }, { status: 201 });
  } catch (error) {
    if (activeId) recentlySeen.delete(activeId);
    console.error("[api/leads] request failed", { error: String(error) });
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
