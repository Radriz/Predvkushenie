import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(), createdAt: integer("created_at").notNull(), eventType: text("event_type").notNull(),
  name: text("name").notNull(), contact: text("contact").notNull(), eventDate: text("event_date"), city: text("city"),
  guestCount: integer("guest_count"), budget: text("budget"), selectedStyle: text("selected_style"), modules: text("modules"),
  musicMood: text("music_mood"), message: text("message"), source: text("source"), notifyStatus: text("notify_status").notNull().default("pending"),
}, table => [index("idx_leads_created_at").on(table.createdAt)]);
