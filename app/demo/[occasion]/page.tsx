import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoExperience } from "../../components/DemoExperience";
import { occasionList, occasions, isOccasionSlug } from "../../lib/occasions";
import { absoluteUrl } from "../../lib/site";

export function generateStaticParams(){ return occasionList.map(item=>({occasion:item.slug})); }

export async function generateMetadata({params}:{params:Promise<{occasion:string}>}):Promise<Metadata>{
  const {occasion}=await params; if(!isOccasionSlug(occasion)) return {};
  const item=occasions[occasion]; const title=`${item.names} — приглашение`;
  const image=absoluteUrl(`/media/${item.slug}.jpg`);
  return {title,description:item.greeting,alternates:{canonical:absoluteUrl(`/demo/${item.slug}`)},openGraph:{title,description:item.greeting,images:[image]},twitter:{card:"summary_large_image",title,description:item.greeting,images:[image]}};
}

export default async function DemoPage({params}:{params:Promise<{occasion:string}>}){
  const {occasion}=await params; if(!isOccasionSlug(occasion)) notFound();
  return <DemoExperience occasion={occasions[occasion]}/>;
}
