"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Occasion } from "../lib/occasions";
import { getCalendarRange } from "../lib/calendar";
import { EventVideo } from "./EventVideo";

function useCountdown(target: string) {
  const calculate = useCallback(() => Math.max(0, new Date(target).getTime() - Date.now()), [target]);
  const [left, setLeft] = useState<number|null>(null);
  useEffect(() => { const initial=window.setTimeout(()=>setLeft(calculate()),0); const id = window.setInterval(() => setLeft(calculate()), 1000); return () => {window.clearTimeout(initial);window.clearInterval(id)}; }, [calculate]);
  if(left===null)return { days:"—", hours:"—", minutes:"—", seconds:"—" };
  return { days: Math.floor(left/86400000), hours: Math.floor(left/3600000)%24, minutes: Math.floor(left/60000)%60, seconds: Math.floor(left/1000)%60 };
}

function SoundToggle({ accent }: { accent: string }) {
  const [playing, setPlaying] = useState(false);
  const audio = useRef<{ctx:AudioContext; nodes:OscillatorNode[]; gain:GainNode}|null>(null);
  useEffect(() => () => { audio.current?.ctx.close().catch(()=>{}); }, []);
  const toggle = async () => {
    if (!audio.current) {
      const ctx = new AudioContext(); const gain = ctx.createGain(); gain.gain.value = 0.035; gain.connect(ctx.destination);
      const frequencies = [174.61, 220, 261.63]; const nodes = frequencies.map((frequency,index)=>{ const osc=ctx.createOscillator(); const lfo=ctx.createOscillator(); const lfoGain=ctx.createGain(); osc.type="sine"; osc.frequency.value=frequency; lfo.frequency.value=.06+index*.025; lfoGain.gain.value=1.8; lfo.connect(lfoGain); lfoGain.connect(osc.detune); osc.connect(gain); osc.start(); lfo.start(); return osc; });
      audio.current={ctx,nodes,gain}; setPlaying(true); localStorage.setItem("pre-sound","on"); return;
    }
    if (audio.current.ctx.state === "running") { await audio.current.ctx.suspend(); setPlaying(false); localStorage.setItem("pre-sound","off"); }
    else { await audio.current.ctx.resume(); setPlaying(true); localStorage.setItem("pre-sound","on"); }
  };
  return <button type="button" onClick={toggle} className="sound-toggle" style={{"--sound":accent} as React.CSSProperties} aria-pressed={playing} aria-label={playing?"Выключить музыку":"Включить музыку"}><span>{playing?"Ⅱ":"▶"}</span>{playing?"музыка играет":"включить музыку"}</button>;
}

export function DemoExperience({ occasion }: { occasion: Occasion }) {
  const time = useCountdown(occasion.targetDate);
  const [phase,setPhase] = useState<"cover"|"opening"|"open">("cover"); const [sent,setSent] = useState(false); const [attending,setAttending]=useState("yes");
  useEffect(()=>{if(phase!=="opening")return; const id=window.setTimeout(()=>setPhase("open"),720); return()=>window.clearTimeout(id)},[phase]);
  const calendarUrl = useMemo(()=>{
    const {start,end}=getCalendarRange(occasion.targetDate,occasion.durationMinutes);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(occasion.names)}&dates=${start}/${end}&location=${encodeURIComponent(occasion.address)}`;
  },[occasion]);
  const extraQuestions=occasion.rsvpQuestions.filter(question=>!/(присутств|будете ли)/i.test(question));
  const openInvitation=()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setPhase("open");return}
    setPhase("opening");
  };
  const programTitle={wedding:"Ритм дня",birthday:"Ритм этой ночи",kids:"План экспедиции",business:"Программа вечера",anniversary:"Ритм вечера",baby:"План встречи"}[occasion.slug];
  return <main className={`demo demo-${occasion.slug}${phase==="open"?" is-open":""}`} style={{"--event-accent":occasion.accent,"--event-surface":occasion.surface,"--event-text":occasion.text} as React.CSSProperties}>
    {phase!=="open" && <section className={`demo-cover${phase==="opening"?" is-opening":""}`}>
      <div className="demo-cover-media"><EventVideo slug={occasion.slug} controls/><div className="media-fallback"/></div>
      <div className="demo-cover-overlay"/><p className="demo-kicker">ПЕРСОНАЛЬНОЕ ПРИГЛАШЕНИЕ</p><h1>{occasion.names}</h1><p>{occasion.date}</p>
      <button type="button" disabled={phase==="opening"} onClick={openInvitation}>{phase==="opening"?"Открываем…":"Открыть приглашение"} <span>↓</span></button>
    </section>}
    {phase==="open" && <div className="demo-content">
      <nav className="demo-nav"><Link href={`/${occasion.slug}`}>← Назад</Link><SoundToggle accent={occasion.accent}/></nav>
      <section className="demo-welcome"><p>{occasion.date}</p><h1>{occasion.names}</h1><div className="demo-rule"/><p>{occasion.greeting}</p><span>ЛИСТАЙТЕ ↓</span></section>
      <section className="demo-countdown"><p>ДО ВСТРЕЧИ ОСТАЛОСЬ</p><div>{Object.entries(time).map(([key,value])=><article key={key}><strong>{typeof value==="number"?String(value).padStart(2,"0"):value}</strong><span>{{days:"дней",hours:"часов",minutes:"минут",seconds:"секунд"}[key as keyof typeof time]}</span></article>)}</div></section>
      <section className="demo-story"><div className="story-number">01</div><div><p>МЕСТО</p><h2>{occasion.venue}</h2><p>{occasion.address}</p><div className="story-actions"><a href={occasion.mapUrl} target="_blank" rel="noreferrer">Открыть карту ↗</a><a href={calendarUrl} target="_blank" rel="noreferrer">В календарь +</a></div></div><div className="story-art"><span/><i/><b/></div></section>
      <section className="demo-program"><p>02 / ПРОГРАММА</p><h2>{programTitle}</h2><div>{occasion.schedule.map((item,index)=><article key={item.time}><span>{item.time}</span><div><h3>{item.title}</h3><p>{item.note}</p></div><b>0{index+1}</b></article>)}</div></section>
      <section className="demo-details"><article><p>03 / ДРЕСС-КОД</p><h2>Ваша палитра</h2><div className="palette"><i/><i/><i/><i/></div><p>{occasion.dress}</p></article><article><p>04 / ПОЖЕЛАНИЕ</p><h2>Главное —<br/>быть рядом</h2><p>{occasion.gift}</p></article></section>
      <section className="demo-rsvp"><div className="rsvp-copy"><p>05 / RSVP</p><h2>Вы с нами?</h2><p>Ответьте до 20 августа.</p><small>{occasion.contact}</small></div>
        {!sent ? <form onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Имя и фамилия<input required name="name" placeholder="Анна Смирнова"/></label><fieldset><legend>Будете с нами?</legend><label><input type="radio" name="attending" value="yes" checked={attending==="yes"} onChange={()=>setAttending("yes")}/> Да</label><label><input type="radio" name="attending" value="no" checked={attending==="no"} onChange={()=>setAttending("no")}/> Не смогу</label></fieldset>{attending==="yes"&&extraQuestions.map((question,index)=><label key={question}>{question}<input name={`detail-${index}`} placeholder="Ваш ответ"/></label>)}<label>Комментарий<textarea name="note" placeholder="Если хотите что-то добавить"/></label><button type="submit">Отправить ответ <span>↗</span></button><small className="demo-form-note">Демо: ответ не отправляется</small></form> : <div className="rsvp-success"><span>✓</span><h3>Ответ отправлен</h3><p>Демо завершено. Спасибо!</p></div>}
      </section>
      <section className="demo-finale"><p>ДО СКОРОЙ ВСТРЕЧИ</p><h2>{occasion.names}</h2><p>{occasion.date}</p><Link href={`/order?event=${occasion.slug}`}>Хочу такое приглашение ↗</Link><small>Демонстрация · все данные вымышлены</small></section>
    </div>}
  </main>;
}
