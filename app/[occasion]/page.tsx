import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OccasionLanding } from "../components/OccasionLanding";
import { occasionList, occasions, isOccasionSlug } from "../lib/occasions";
import { absoluteUrl } from "../lib/site";

export function generateStaticParams(){ return occasionList.map(item=>({occasion:item.slug})); }

export async function generateMetadata({params}:{params:Promise<{occasion:string}>}):Promise<Metadata>{
  const {occasion}=await params; if(!isOccasionSlug(occasion)) return {};
  const item=occasions[occasion];
  const title=`${item.short} — ПРЕДВКУСИЕ`; const image=absoluteUrl(`/media/${item.slug}.jpg`);
  return {title,description:item.description,alternates:{canonical:absoluteUrl(`/${item.slug}`)},openGraph:{title,description:item.description,images:[image]},twitter:{card:"summary_large_image",title,description:item.description,images:[image]}};
}

export default async function OccasionPage({params}:{params:Promise<{occasion:string}>}){
  const {occasion}=await params; if(!isOccasionSlug(occasion)) notFound();
  return <OccasionLanding occasion={occasions[occasion]}/>;
}
