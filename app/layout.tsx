import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import { MotionPolicy } from "./components/MotionPolicy";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["cyrillic", "latin"], weight: ["400", "500", "600"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["cyrillic", "latin"], weight: ["400", "500", "600", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders=await headers(); const host=requestHeaders.get("host")||"localhost:3000"; const protocol=requestHeaders.get("x-forwarded-proto")||"http"; const base=new URL(`${protocol}://${host}`);
  const title="ПРЕДВКУСИЕ — кинематографичные приглашения"; const description="Сайты-приглашения под ключ для событий, которые начинаются до события.";
  return {metadataBase:base,title,description,icons:{icon:"/favicon.svg"},openGraph:{title,description,images:[new URL("/og.png",base).toString()]},twitter:{card:"summary_large_image",title,description,images:[new URL("/og.png",base).toString()]}};
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body className={`${display.variable} ${sans.variable}`}><MotionPolicy/>{children}</body></html>;
}
