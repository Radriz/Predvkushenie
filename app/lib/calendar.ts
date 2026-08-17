export function getCalendarRange(targetDate: string, durationMinutes: number) {
  const start = new Date(targetDate);
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  return { start: stamp(start), end: stamp(end) };
}
