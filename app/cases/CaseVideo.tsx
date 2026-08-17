"use client";

import {useRef,useState} from "react";

export function CaseVideo({src,poster}:{src:string;poster:string}){
  const ref=useRef<HTMLVideoElement>(null);
  const [playing,setPlaying]=useState(false);
  const toggle=()=>{
    const video=ref.current;
    if(!video)return;
    if(video.paused){video.dataset.userPaused="false";video.play().catch(()=>{})}
    else{video.dataset.userPaused="true";video.pause()}
  };
  return <>
    <video ref={ref} muted loop playsInline preload="metadata" poster={poster} data-user-paused="false" aria-hidden="true" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}>
      <source src={src} type="video/mp4"/>
    </video>
    <button className="case-video-toggle" type="button" onClick={toggle} aria-label={playing?"Остановить фоновое видео":"Включить фоновое видео"} aria-pressed={playing}>{playing?"Пауза":"Смотреть"}</button>
  </>;
}
