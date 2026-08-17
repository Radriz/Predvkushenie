"use client";

import { useRef, useState } from "react";

export function EventVideo({slug,controls=false}:{slug:string;controls?:boolean}){
  const ref=useRef<HTMLVideoElement>(null);
  const [playing,setPlaying]=useState(false);
  const toggle=()=>{
    const video=ref.current;
    if(!video)return;
    if(video.paused){video.dataset.userPaused="false";video.play().catch(()=>{})}
    else{video.dataset.userPaused="true";video.pause()}
  };
  return <>
    <video ref={ref} muted loop playsInline preload="metadata" poster={`/media/${slug}.jpg`} aria-hidden="true" data-user-paused="false" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}>
      <source src={`/media/${slug}-mobile-hq.mp4`} media="(max-width: 640px)" type="video/mp4" />
      <source src={`/media/${slug}-hd.mp4`} type="video/mp4" />
      <source src={`/media/${slug}.webm`} type="video/webm" />
    </video>
    {controls&&<button className="video-toggle" type="button" onClick={toggle} aria-label={playing?"Остановить фоновое видео":"Включить фоновое видео"} aria-pressed={playing}><span aria-hidden="true">{playing?"Ⅱ":"▶"}</span></button>}
  </>;
}
