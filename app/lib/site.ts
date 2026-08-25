export const siteUrl = "https://predvkushenie.vercel.app";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
