"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { occasionList } from "../lib/occasions";

type Draft={eventType:string;name:string;contact:string;eventDate:string;city:string;guestCount:string;budget:string;selectedStyle:string;modules:string[];musicMood:string;message:string;consent:boolean;website:string};
const empty:Draft={eventType:"wedding",name:"",contact:"",eventDate:"",city:"",guestCount:"",budget:"9 900–17 900 ₽",selectedStyle:"Кинематографичный",modules:["RSVP","Карта и тайминг"],musicMood:"Деликатный ambient",message:"",consent:false,website:""};
const moduleOptions=["RSVP","Карта и тайминг","Музыка","Персональные ссылки","Вишлист","Чат гостей","Галерея после события"];

export function OrderForm(){
  const [step,setStep]=useState(1); const [draft,setDraft]=useState<Draft>(()=>{
    if(typeof window==="undefined")return empty;
    let initial={...empty};
    const stored=localStorage.getItem("pre-order-draft");
    if(stored){try{initial={...initial,...JSON.parse(stored)}}catch{/* Ignore an invalid local draft. */}}
    const event=new URLSearchParams(window.location.search).get("event");
    if(event&&occasionList.some(x=>x.slug===event))initial.eventType=event;
    return initial;
  }); const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  useEffect(()=>{localStorage.setItem("pre-order-draft",JSON.stringify(draft))},[draft]);
  const progress=useMemo(()=>`${step}/4`,[step]);
  const patch=<K extends keyof Draft>(key:K,value:Draft[K])=>setDraft(d=>({...d,[key]:value}));
  const toggleModule=(value:string)=>patch("modules",draft.modules.includes(value)?draft.modules.filter(x=>x!==value):[...draft.modules,value]);
  const submit=async(e:FormEvent)=>{e.preventDefault(); if(!draft.consent)return; setStatus("sending"); try{const response=await fetch("/api/leads",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...draft,guestCount:Number(draft.guestCount||0),source:"website",idempotencyKey:crypto.randomUUID()})}); if(!response.ok)throw new Error(); setStatus("success"); localStorage.removeItem("pre-order-draft");}catch{setStatus("error")}};
  if(status==="success")return <div className="order-success"><span>✓</span><p>БРИФ ПОЛУЧЕН</p><h1>Первый кадр<br/>уже случился.</h1><p>Мы изучим детали и свяжемся с вами в течение рабочего дня.</p><Link href="/">Вернуться на главную ↗</Link></div>;
  return <form className="order-form" onSubmit={submit}>
    <div className="order-progress"><span>ШАГ {progress}</span><div><i style={{width:`${step*25}%`}}/></div><button type="button" onClick={()=>setStep(Math.max(1,step-1))} disabled={step===1}>← Назад</button></div>
    {step===1&&<section><p>01 / ПОВОД</p><h1>Что будем<br/>предвкушать?</h1><div className="occasion-picks">{occasionList.map(item=><button type="button" className={draft.eventType===item.slug?"active":""} onClick={()=>patch("eventType",item.slug)} key={item.slug}><span>{item.number}</span>{item.short}<b>↗</b></button>)}</div></section>}
    {step===2&&<section><p>02 / КОНТЕКСТ</p><h1>Расскажите<br/>о событии.</h1><div className="field-grid"><label>Дата<input type="date" value={draft.eventDate} onChange={e=>patch("eventDate",e.target.value)}/></label><label>Город<input placeholder="Москва" value={draft.city} onChange={e=>patch("city",e.target.value)}/></label><label>Примерно гостей<input type="number" min="1" placeholder="50" value={draft.guestCount} onChange={e=>patch("guestCount",e.target.value)}/></label><label>Бюджет<select value={draft.budget} onChange={e=>patch("budget",e.target.value)}><option>до 9 900 ₽</option><option>9 900–17 900 ₽</option><option>от 17 900 ₽</option><option>Business от 29 900 ₽</option></select></label></div></section>}
    {step===3&&<section><p>03 / АТМОСФЕРА</p><h1>Как должно<br/>ощущаться?</h1><div className="field-grid"><label>Визуальный характер<select value={draft.selectedStyle} onChange={e=>patch("selectedStyle",e.target.value)}><option>Кинематографичный</option><option>Редакционный и светлый</option><option>Смелый и экспериментальный</option><option>Тёплый и тактильный</option></select></label><label>Музыкальное настроение<select value={draft.musicMood} onChange={e=>patch("musicMood",e.target.value)}><option>Деликатный ambient</option><option>Современная классика</option><option>Энергичный electronic</option><option>Без музыки</option></select></label></div><fieldset className="module-picks"><legend>Что добавить</legend>{moduleOptions.map(item=><label key={item}><input type="checkbox" checked={draft.modules.includes(item)} onChange={()=>toggleModule(item)}/><span>{item}</span></label>)}</fieldset></section>}
    {step===4&&<section><p>04 / ЗНАКОМСТВО</p><h1>Куда отправить<br/>первую идею?</h1><div className="field-grid"><label>Ваше имя<input required value={draft.name} onChange={e=>patch("name",e.target.value)} placeholder="Анна"/></label><label>Telegram, телефон или email<input required value={draft.contact} onChange={e=>patch("contact",e.target.value)} placeholder="@username"/></label></div><label className="wide-field">Что нам важно знать<textarea value={draft.message} onChange={e=>patch("message",e.target.value)} placeholder="Расскажите об идее, героях и деталях, которые хочется сохранить..."/></label><label className="honeypot" aria-hidden="true">Ваш сайт<input tabIndex={-1} autoComplete="off" value={draft.website} onChange={e=>patch("website",e.target.value)}/></label><label className="consent"><input type="checkbox" checked={draft.consent} onChange={e=>patch("consent",e.target.checked)}/><span>Я соглашаюсь с <Link href="/privacy" target="_blank">политикой обработки данных</Link></span></label>{status==="error"&&<p className="form-error">Не удалось отправить. Проверьте соединение и попробуйте снова.</p>}</section>}
    <div className="order-next">{step<4?<button type="button" onClick={()=>setStep(step+1)}>Продолжить <span>→</span></button>:<button disabled={!draft.consent||status==="sending"} type="submit">{status==="sending"?"Отправляем…":"Отправить бриф"} <span>↗</span></button>}<small>Черновик сохраняется на этом устройстве</small></div>
  </form>;
}
