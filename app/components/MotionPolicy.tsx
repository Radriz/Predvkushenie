"use client";
import { useEffect } from "react";

export function MotionPolicy(){
  useEffect(()=>{
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection=(navigator as Navigator & {connection?:{saveData?:boolean;effectiveType?:string}}).connection;
    const constrained=Boolean(connection?.saveData)||connection?.effectiveType==="2g";
    const observed=new Set<HTMLVideoElement>();
    const intersection=new IntersectionObserver(entries=>entries.forEach(entry=>{
      const video=entry.target as HTMLVideoElement;
      if(entry.isIntersecting&&video.dataset.userPaused!=="true")video.play().catch(()=>{}); else video.pause();
    }),{rootMargin:"160px 0px",threshold:.08});
    const prepare=(video:HTMLVideoElement)=>{
      if(observed.has(video))return;
      observed.add(video);
      if(reduced||constrained){video.pause();video.preload="none";return;}
      video.preload="metadata";
      intersection.observe(video);
    };
    document.querySelectorAll<HTMLVideoElement>("video").forEach(prepare);
    const videosIn=(node:Node)=>{
      if(!(node instanceof Element))return [];
      return [...(node instanceof HTMLVideoElement?[node]:[]),...node.querySelectorAll<HTMLVideoElement>("video")];
    };
    const mutations=new MutationObserver(records=>records.forEach(record=>{
      record.addedNodes.forEach(node=>videosIn(node).forEach(prepare));
      record.removedNodes.forEach(node=>videosIn(node).forEach(video=>{intersection.unobserve(video);observed.delete(video)}));
    }));
    mutations.observe(document.body,{childList:true,subtree:true});
    return ()=>{mutations.disconnect();intersection.disconnect()};
  },[]);
  return null;
}
