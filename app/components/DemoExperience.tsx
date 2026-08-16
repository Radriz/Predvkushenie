"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Occasion } from "../lib/occasions";

function useCountdown(target: string) {
  const calculate = useCallback(() => Math.max(0, new Date(target).getTime() - Date.now()), [target]);
  const [left, setLeft] = useState(calculate);
  useEffect(() => { const id = window.setInterval(() => setLeft(calculate()), 1000); return () => window.clearInterval(id); }, [calculate]);
  return { days: Math.floor(left/86400000), hours: Math.floor(left/3600000)%24, minutes: Math.floor(left/60000)%60, seconds: Math.floor(left/1000)%60 };
}

function SoundToggle({ accent }: { accent: string }) {
  const [playing, setPlaying] = useState(false);
  const audio = useRef<{ctx:AudioContext; nodes:OscillatorNode[]; gain:GainNode}|null>(null);
  useEffect(() => () => { audio.current?.ctx.close(); }, []);
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
  const [opened,setOpened] = useState(false); const [sent,setSent] = useState(false); const [attending,setAttending]=useState("yes");
  const calendarUrl = useMemo(()=>`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(occasion.names)}&dates=${occasion.targetDate.replace(/[-:]/g,"").slice(0,15)}Z/${occasion.targetDate.replace(/[-:]/g,"").slice(0,15)}Z&location=${encodeURIComponent(occasion.address)}`,[occasion]);
  return <main className={`demo demo-${occasion.slug}${opened?" is-open":""}`} style={{"--event-accent":occasion.accent,"--event-surface":occasion.surface,"--event-text":occasion.text} as React.CSSProperties}>
    {!opened && <section className="demo-cover">
      <div className="demo-cover-media"><video autoPlay muted loop playsInline poster={`/media/${occasion.slug}.jpg`}><source src={`/media/${occasion.slug}-mobile.mp4`} media="(max-width: 640px)" type="video/mp4"/><source src={`/media/${occasion.slug}.webm`} type="video/webm"/><source src={`/media/${occasion.slug}.mp4`} type="video/mp4"/></video><div className="media-fallback"/></div>
      <div className="demo-cover-overlay"/><p className="demo-kicker">ПЕРСОНАЛЬНОЕ ПРИГЛАШЕНИЕ</p><h1>{occasion.names}</h1><p>{occasion.date}</p>
      <button type="button" onClick={()=>setOpened(true)}>Открыть приглашение <span>↓</span></button><small>для просмотра проведите вниз</small>
    </section>}
    {opened && <>
      <nav className="demo-nav"><Link href={`/${occasion.slug}`}>← В коллекцию</Link><SoundToggle accent={occasion.accent}/></nav>
      <section className="demo-welcome"><p>{occasion.date}</p><h1>{occasion.names}</h1><div className="demo-rule"/><p>{occasion.greeting}</p><span>ЛИСТАЙТЕ, ЧТОБЫ УЗНАТЬ БОЛЬШЕ ↓</span></section>
      <section className="demo-countdown"><p>ДО ВСТРЕЧИ ОСТАЛОСЬ</p><div>{Object.entries(time).map(([key,value])=><article key={key}><strong>{String(value).padStart(2,"0")}</strong><span>{{days:"дней",hours:"часов",minutes:"минут",seconds:"секунд"}[key as keyof typeof time]}</span></article>)}</div></section>
      <section className="demo-story"><div className="story-number">01</div><div><p>МЕСТО</p><h2>{occasion.venue}</h2><p>{occasion.address}</p><div className="story-actions"><a href={occasion.mapUrl} target="_blank" rel="noreferrer">Открыть карту ↗</a><a href={calendarUrl} target="_blank" rel="noreferrer">В календарь +</a></div></div><div className="story-art"><span/><i/><b/></div></section>
      <section className="demo-program"><p>02 / ПРОГРАММА</p><h2>Ритм нашего дня</h2><div>{occasion.schedule.map((item,index)=><article key={item.time}><span>{item.time}</span><div><h3>{item.title}</h3><p>{item.note}</p></div><b>0{index+1}</b></article>)}</div></section>
      <section className="demo-details"><article><p>03 / ДРЕСС-КОД</p><h2>Будьте собой,<br/>но в этой палитре</h2><div className="palette"><i/><i/><i/><i/></div><p>{occasion.dress}</p></article><article><p>04 / ПОЖЕЛАНИЕ</p><h2>Самое важное —<br/>вы рядом</h2><p>{occasion.gift}</p></article></section>
      <section className="demo-rsvp"><div className="rsvp-copy"><p>05 / RSVP</p><h2>Вы будете<br/>с нами?</h2><p>Пожалуйста, ответьте до 20 августа. Это займёт меньше двадцати секунд.</p><small>{occasion.contact}</small></div>
        {!sent ? <form onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Ваши имя и фамилия<input required name="name" placeholder="Например, Анна Смирнова"/></label><fieldset><legend>Планируете присутствовать?</legend><label><input type="radio" name="attending" value="yes" checked={attending==="yes"} onChange={()=>setAttending("yes")}/> Да, с удовольствием</label><label><input type="radio" name="attending" value="no" checked={attending==="no"} onChange={()=>setAttending("no")}/> К сожалению, не смогу</label></fieldset>{attending==="yes"&&<label>Комментарий или пожелание<textarea name="note" placeholder={occasion.rsvpQuestions.slice(1).join(" · ")}/></label>}<button type="submit">Отправить ответ <span>↗</span></button></form> : <div className="rsvp-success"><span>✓</span><h3>Ответ отправлен</h3><p>Спасибо! Мы очень ждём встречи.</p></div>}
      </section>
      <section className="demo-finale"><p>ДО СКОРОЙ ВСТРЕЧИ</p><h2>{occasion.names}</h2><p>{occasion.date}</p><Link href={`/order?event=${occasion.slug}`}>Хочу такое приглашение ↗</Link><small>Демонстрация · все данные вымышлены</small></section>
    </>}
  </main>;
}
