import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { getCalendarRange } from "../app/lib/calendar.ts";
import { occasions as occasionData } from "../app/lib/occasions.ts";

const routes = [
  "/",
  "/wedding", "/birthday", "/kids", "/business", "/anniversary", "/baby",
  "/demo/wedding", "/demo/birthday", "/demo/kids", "/demo/business", "/demo/anniversary", "/demo/baby",
  "/cases", "/cases/wedding-glass-garden", "/cases/wedding-midnight-atlas", "/cases/wedding-saffron-tide", "/order", "/privacy", "/terms",
];
const occasions = ["wedding", "birthday", "kids", "business", "anniversary", "baby"];
function compactUtc(value) {
  return Date.UTC(+value.slice(0, 4), +value.slice(4, 6) - 1, +value.slice(6, 8), +value.slice(9, 11), +value.slice(11, 13), +value.slice(13, 15));
}

async function inspectMp4(url) {
  const bytes = await readFile(url);
  assert.equal(bytes.subarray(4, 8).toString("ascii"), "ftyp", `${url} has no MP4 signature`);
  const marker = Buffer.from("avc1");
  for (let avc1 = bytes.indexOf(marker); avc1 > 0; avc1 = bytes.indexOf(marker, avc1 + marker.length)) {
    const dimensions = { width: bytes.readUInt16BE(avc1 + 28), height: bytes.readUInt16BE(avc1 + 30) };
    if (dimensions.width > 0 && dimensions.height > 0) return dimensions;
  }
  assert.fail(`${url} has no H.264/AVC video track`);
}

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

function environment() {
  return { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
}

test("server-renders every public route", async () => {
  const worker = await loadWorker();
  for (const route of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }),
      environment(),
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, route);
    const html = await response.text();
    assert.match(html, /ПРЕДВКУСИЕ|Открыть приглашение/i, route);
    assert.doesNotMatch(html, /Your site is taking shape|Building your site/i, route);
  }
});

test("calendar ranges follow every occasion schedule", () => {
  for (const occasion of Object.values(occasionData)) {
    const [startHour, startMinute] = occasion.schedule[0].time.split(":").map(Number);
    const [endHour, endMinute] = occasion.schedule.at(-1).time.split(":").map(Number);
    let scheduleMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    if (scheduleMinutes < 0) scheduleMinutes += 24 * 60;
    assert.equal(occasion.durationMinutes, scheduleMinutes, `${occasion.slug} duration follows schedule`);
    const range = getCalendarRange(occasion.targetDate, occasion.durationMinutes);
    assert.equal((compactUtc(range.end) - compactUtc(range.start)) / 60_000, scheduleMinutes, `${occasion.slug} calendar range`);
  }
});

test("ships high-quality desktop and mobile video for every occasion", async () => {
  for (const occasion of occasions) {
    const desktopUrl = new URL(`../public/media/${occasion}-hd.mp4`, import.meta.url);
    const mobileUrl = new URL(`../public/media/${occasion}-mobile-hq.mp4`, import.meta.url);
    const desktop = await stat(desktopUrl);
    const mobile = await stat(mobileUrl);
    assert.ok(desktop.size > 500_000, `${occasion} desktop video is unexpectedly small`);
    assert.ok(mobile.size > 350_000, `${occasion} mobile video is unexpectedly small`);
    assert.deepEqual(await inspectMp4(desktopUrl), { width: 1280, height: 720 }, `${occasion} desktop dimensions`);
    assert.deepEqual(await inspectMp4(mobileUrl), { width: 960, height: 540 }, `${occasion} mobile dimensions`);
  }
});

test("ships optimized cinematic media for published cases", async () => {
  const cases = [
    { slug: "wedding-glass-garden", minImage: 250_000, dimensions: { width: 1280, height: 720 } },
    { slug: "wedding-midnight-atlas", minImage: 150_000, dimensions: { width: 1904, height: 1088 } },
    { slug: "wedding-saffron-tide", minImage: 150_000, dimensions: { width: 1280, height: 720 } },
  ];
  for (const item of cases) {
    const imageUrl = new URL(`../public/cases/${item.slug}/hero.webp`, import.meta.url);
    const videoUrl = new URL(`../public/cases/${item.slug}/hero.mp4`, import.meta.url);
    const image = await stat(imageUrl);
    const video = await stat(videoUrl);
    assert.ok(image.size > item.minImage && image.size < 1_000_000, `${item.slug} poster should retain detail without shipping the raw source`);
    assert.ok(video.size > 1_500_000 && video.size < 5_000_000, `${item.slug} video should be detailed and web-sized`);
    assert.deepEqual(await inspectMp4(videoUrl), item.dimensions, `${item.slug} video dimensions`);
  }
});
