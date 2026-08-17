/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  LEADS_EMAIL?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/leads" && request.method === "POST") {
      return handleLead(request, env, ctx);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

const allowedEvents = new Set(["wedding", "birthday", "kids", "business", "anniversary", "baby"]);
function clean(value: unknown, max = 500): string { return typeof value === "string" ? value.trim().slice(0, max) : ""; }

async function handleLead(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  try {
    const data = await request.json() as Record<string, unknown>;
    if (clean(data.website, 100)) return Response.json({ ok: true });
    const eventType = clean(data.eventType, 30); const name = clean(data.name, 120); const contact = clean(data.contact, 180);
    if (!allowedEvents.has(eventType) || name.length < 2 || contact.length < 3 || data.consent !== true) return Response.json({ error: "invalid_request" }, { status: 400 });
    const id = clean(data.idempotencyKey, 80) || crypto.randomUUID();
    const modules = Array.isArray(data.modules) ? data.modules.map(x => clean(x, 60)).filter(Boolean).slice(0, 12) : [];
    await env.DB.batch([
      env.DB.prepare("CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, created_at INTEGER NOT NULL, event_type TEXT NOT NULL, name TEXT NOT NULL, contact TEXT NOT NULL, event_date TEXT, city TEXT, guest_count INTEGER, budget TEXT, selected_style TEXT, modules TEXT, music_mood TEXT, message TEXT, source TEXT, notify_status TEXT NOT NULL DEFAULT 'pending')"),
      env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at)")
    ]);
    const values = { id, createdAt: Date.now(), eventType, name, contact, eventDate:clean(data.eventDate,30), city:clean(data.city,120), guestCount:Math.max(0,Math.min(100000,Number(data.guestCount)||0)), budget:clean(data.budget,80), selectedStyle:clean(data.selectedStyle,100), modules:JSON.stringify(modules), musicMood:clean(data.musicMood,100), message:clean(data.message,2000), source:clean(data.source,80)||"website" };
    await env.DB.prepare("INSERT OR IGNORE INTO leads (id, created_at, event_type, name, contact, event_date, city, guest_count, budget, selected_style, modules, music_mood, message, source, notify_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')").bind(values.id,values.createdAt,values.eventType,values.name,values.contact,values.eventDate,values.city,values.guestCount,values.budget,values.selectedStyle,values.modules,values.musicMood,values.message,values.source).run();
    ctx.waitUntil(notifyLead(env, values).then(status => env.DB.prepare("UPDATE leads SET notify_status = ? WHERE id = ?").bind(status,id).run()).catch(()=>env.DB.prepare("UPDATE leads SET notify_status = 'failed' WHERE id = ?").bind(id).run()));
    return Response.json({ ok: true, id }, { status: 201 });
  } catch { return Response.json({ error: "server_error" }, { status: 500 }); }
}

async function notifyTelegram(env: Env, lead: Record<string, unknown>): Promise<string> {
  const text = [`Новая заявка · ПРЕДВКУСИЕ`,`Повод: ${lead.eventType}`,`Имя: ${lead.name}`,`Контакт: ${lead.contact}`,`Дата / город: ${lead.eventDate || "—"} · ${lead.city || "—"}`,`Гостей: ${lead.guestCount || "—"}`,`Бюджет: ${lead.budget || "—"}`,`Стиль: ${lead.selectedStyle || "—"}`,`Модули: ${JSON.parse(String(lead.modules)).join(", ") || "—"}`,`Сообщение: ${lead.message || "—"}`].join("\n");
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:env.TELEGRAM_CHAT_ID,text})});
  return response.ok ? "sent" : "failed";
}

async function notifyLead(env: Env, lead: Record<string, unknown>): Promise<string> {
  const deliveries: Promise<boolean>[] = [notifyEmail(env, lead)];
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) deliveries.push(notifyTelegram(env, lead).then(status => status === "sent"));
  return (await Promise.all(deliveries)).some(Boolean) ? "sent" : "failed";
}

async function notifyEmail(env: Env, lead: Record<string, unknown>): Promise<boolean> {
  const recipient = env.LEADS_EMAIL || "radiksun@list.ru";
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      origin: "https://predvkushenie-invite.modest-glade-7892.chatgpt.site",
      referer: "https://predvkushenie-invite.modest-glade-7892.chatgpt.site/order",
    },
    body: JSON.stringify({
      _subject: `Новая заявка · ПРЕДВКУСИЕ · ${lead.name}`,
      _template: "table",
      _captcha: "false",
      Повод: lead.eventType,
      Имя: lead.name,
      Контакт: lead.contact,
      Дата: lead.eventDate || "Не указана",
      Город: lead.city || "Не указан",
      Гостей: lead.guestCount || "Не указано",
      Бюджет: lead.budget || "Не указан",
      Стиль: lead.selectedStyle || "Не указан",
      Дополнения: JSON.parse(String(lead.modules)).join(", ") || "Не указаны",
      Сообщение: lead.message || "Нет сообщения",
    }),
  });
  return response.ok;
}

export default worker;
