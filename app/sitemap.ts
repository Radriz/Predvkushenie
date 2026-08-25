import type { MetadataRoute } from "next";
import { invitationCases } from "./lib/cases";
import { occasionList } from "./lib/occasions";
import { absoluteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["/", "/cases", "/order", "/privacy", "/terms"];
  routes.push(...occasionList.flatMap(item => [`/${item.slug}`, `/demo/${item.slug}`]));
  routes.push(...invitationCases.map(item => `/cases/${item.slug}`));
  return routes.map(url => ({ url: absoluteUrl(url), lastModified: now, changeFrequency: url === "/" ? "weekly" : "monthly", priority: url === "/" ? 1 : url === "/order" ? 0.9 : 0.7 }));
}
