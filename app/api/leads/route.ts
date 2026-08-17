const allowedEvents = new Set(["wedding", "birthday", "kids", "business", "anniversary", "baby"]);

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const data = await request.json() as Record<string, unknown>;
    if (clean(data.website, 100)) return Response.json({ ok: true });

    const eventType = clean(data.eventType, 30);
    const name = clean(data.name, 120);
    const contact = clean(data.contact, 180);
    if (!allowedEvents.has(eventType) || name.length < 2 || contact.length < 3 || data.consent !== true) {
      return Response.json({ error: "invalid_request" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!botToken || !chatId) {
      console.error("[api/leads] Telegram environment is not configured");
      return Response.json({ error: "service_not_configured" }, { status: 503 });
    }

    const modules = Array.isArray(data.modules)
      ? data.modules.map((item) => clean(item, 60)).filter(Boolean).slice(0, 12)
      : [];
    const message = [
      "Новая заявка · ПРЕДВКУСИЕ",
      `Повод: ${eventType}`,
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      `Дата / город: ${clean(data.eventDate, 30) || "—"} · ${clean(data.city, 120) || "—"}`,
      `Гостей: ${Math.max(0, Math.min(100000, Number(data.guestCount) || 0)) || "—"}`,
      `Бюджет: ${clean(data.budget, 80) || "—"}`,
      `Стиль: ${clean(data.selectedStyle, 100) || "—"}`,
      `Модули: ${modules.join(", ") || "—"}`,
      `Сообщение: ${clean(data.message, 2000) || "—"}`,
    ].join("\n");

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error("[api/leads] Telegram notification failed", { status: response.status });
      return Response.json({ error: "notification_failed" }, { status: 502 });
    }

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[api/leads] request failed", { error: String(error) });
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
