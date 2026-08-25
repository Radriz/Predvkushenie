import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionPolicy } from "./components/MotionPolicy";
import { siteUrl } from "./lib/site";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["cyrillic", "latin"], weight: ["400", "500", "600"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["cyrillic", "latin"], weight: ["400", "500", "600", "700"] });

const title="ПРЕДВКУСИЕ — кинематографичные приглашения";
const description="Сайты-приглашения под ключ для событий, которые начинаются до события";
export const metadata: Metadata={metadataBase:new URL(siteUrl),title,description,icons:{icon:"/favicon.svg"},openGraph:{title,description,images:["/og.jpg"]},twitter:{card:"summary_large_image",title,description,images:["/og.jpg"]}};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData={"@context":"https://schema.org","@type":"ProfessionalService",name:"ПРЕДВКУСИЕ",url:siteUrl,email:"radiksun@list.ru",description:"Студия цифровых сайтов-приглашений для частных и деловых событий",areaServed:"RU",priceRange:"₽₽"};
  return <html lang="ru"><body className={`${display.variable} ${sans.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/><MotionPolicy/>{children}</body></html>;
}
