"use client";
import { useEffect } from "react";

export function MotionPolicy(){
  useEffect(()=>{
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection=(navigator as Navigator & {connection?:{saveData?:boolean;effectiveType?:string}}).connection;
    const constrained=Boolean(connection?.saveData)||connection?.effectiveType==="2g";
    const videos=[...document.querySelectorAll<HTMLVideoElement>("video")];
    if(reduced||constrained) videos.forEach(video=>{video.pause();video.removeAttribute("autoplay");video.preload="none"});
    else videos.forEach(video=>{video.preload="metadata";video.play().catch(()=>{})});
  },[]);
  return null;
}
