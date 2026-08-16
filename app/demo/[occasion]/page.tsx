import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoExperience } from "../../components/DemoExperience";
import { occasionList, occasions, isOccasionSlug } from "../../lib/occasions";

export function generateStaticParams(){ return occasionList.map(item=>({occasion:item.slug})); }

export async function generateMetadata({params}:{params:Promise<{occasion:string}>}):Promise<Metadata>{
  const {occasion}=await params; if(!isOccasionSlug(occasion)) return {};
  const item=occasions[occasion]; const title=`${item.names} — приглашение`;
  return {title,description:item.greeting,openGraph:{title,description:item.greeting,images:[]},twitter:{title,description:item.greeting,images:[]}};
}

export default async function DemoPage({params}:{params:Promise<{occasion:string}>}){
  const {occasion}=await params; if(!isOccasionSlug(occasion)) notFound();
  return <DemoExperience occasion={occasions[occasion]}/>;
}
