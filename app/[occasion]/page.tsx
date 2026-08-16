import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OccasionLanding } from "../components/OccasionLanding";
import { occasionList, occasions, isOccasionSlug } from "../lib/occasions";

export function generateStaticParams(){ return occasionList.map(item=>({occasion:item.slug})); }

export async function generateMetadata({params}:{params:Promise<{occasion:string}>}):Promise<Metadata>{
  const {occasion}=await params; if(!isOccasionSlug(occasion)) return {};
  const item=occasions[occasion];
  return {title:`${item.short} — ПРЕДВКУСИЕ`,description:item.description,openGraph:{title:`${item.short} — ПРЕДВКУСИЕ`,description:item.description,images:[]},twitter:{title:`${item.short} — ПРЕДВКУСИЕ`,description:item.description,images:[]}};
}

export default async function OccasionPage({params}:{params:Promise<{occasion:string}>}){
  const {occasion}=await params; if(!isOccasionSlug(occasion)) notFound();
  return <OccasionLanding occasion={occasions[occasion]}/>;
}
