"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { occasionList } from "../lib/occasions";

type Draft={eventType:string;name:string;contact:string;eventDate:string;city:string;guestCount:string;budget:string;selectedStyle:string;modules:string[];musicMood:string;message:string;consent:boolean;website:string};
const empty:Draft={eventType:"wedding",name:"",contact:"",eventDate:"",city:"",guestCount:"",budget:"PREMIUM — 4 990 ₽",selectedStyle:"Кинематографичный",modules:["Ответы гостей","Карта и программа"],musicMood:"Деликатный фон",message:"",consent:false,website:""};
const moduleOptions=["Ответы гостей","Карта и программа","Музыка","Персональные ссылки","Список подарков","Чат гостей","Галерея после события"];
const emailEndpoint="https://formsubmit.co/ajax/radiksun%40list.ru";

async function deliverByEmail(draft:Draft){
  const response=await fetch(emailEndpoint,{method:"POST",headers:{"content-type":"application/json",accept:"application/json"},body:JSON.stringify({
    _subject:`Новая заявка · ПРЕДВКУСИЕ · ${draft.name}`,_template:"table",_captcha:"false",
    Повод:draft.eventType,Имя:draft.name,Контакт:draft.contact,Дата:draft.eventDate||"Не указана",Город:draft.city||"Не указан",
    Гостей:draft.guestCount||"Не указано",Тариф:draft.budget,Стиль:draft.selectedStyle,Дополнения:draft.modules.join(", ")||"Не указаны",Сообщение:draft.message||"Нет сообщения",
  })});
  return response.ok;
}

export function OrderForm(){
  const [step,setStep]=useState(1); const [draft,setDraft]=useState<Draft>(()=>{
    if(typeof window==="undefined")return empty;
    let initial={...empty};
    const stored=localStorage.getItem("pre-order-draft");
    if(stored){try{initial={...initial,...JSON.parse(stored)}}catch{/* Ignore an invalid local draft. */}}
    const event=new URLSearchParams(window.location.search).get("event");
    if(event&&occasionList.some(x=>x.slug===event))initial.eventType=event;
    const plan=new URLSearchParams(window.location.search).get("plan");
    const planNames:Record<string,string>={start:"START — 1 990 ₽",premium:"PREMIUM — 4 990 ₽",wow:"WOW — 9 990 ₽"};
    if(plan&&planNames[plan])initial.budget=planNames[plan];
    return initial;
  }); const [status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
  useEffect(()=>{localStorage.setItem("pre-order-draft",JSON.stringify(draft))},[draft]);
  const progress=useMemo(()=>`${step}/4`,[step]);
  const patch=<K extends keyof Draft>(key:K,value:Draft[K])=>setDraft(d=>({...d,[key]:value}));
  const toggleModule=(value:string)=>patch("modules",draft.modules.includes(value)?draft.modules.filter(x=>x!==value):[...draft.modules,value]);
  const submit=async(e:FormEvent)=>{e.preventDefault(); if(!draft.consent)return; setStatus("sending"); try{
    const [apiResult,emailResult]=await Promise.allSettled([
      fetch("/api/leads",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...draft,guestCount:Number(draft.guestCount||0),source:"website",idempotencyKey:crypto.randomUUID()})}),
      deliverByEmail(draft),
    ]);
    const stored=apiResult.status==="fulfilled"&&apiResult.value.ok;
    const emailed=emailResult.status==="fulfilled"&&emailResult.value;
    if(!stored&&!emailed)throw new Error();
    setStatus("success"); localStorage.removeItem("pre-order-draft");
  }catch{setStatus("error")}};
  if(status==="success")return <div className="order-success"><span>✓</span><p>БРИФ ПОЛУЧЕН</p><h1>Первый кадр<br/>уже случился</h1><p>Мы изучим детали и свяжемся с вами в течение рабочего дня</p><Link href="/">Вернуться на главную ↗</Link></div>;
  return <form className="order-form" onSubmit={submit}>
    <div className="order-progress"><span>ШАГ {progress}</span><div><i style={{width:`${step*25}%`}}/></div><button type="button" onClick={()=>setStep(Math.max(1,step-1))} disabled={step===1}>← Назад</button></div>
    {step===1&&<section><p>ПОВОД</p><h1>Что будем<br/>предвкушать?</h1><div className="occasion-picks">{occasionList.map(item=><button type="button" className={draft.eventType===item.slug?"active":""} onClick={()=>patch("eventType",item.slug)} key={item.slug}>{item.short}<b>↗</b></button>)}</div></section>}
    {step===2&&<section><p>О СОБЫТИИ · МОЖНО ПРОПУСТИТЬ</p><h1>Расскажите<br/>о событии</h1><div className="field-grid"><label>Дата, если известна<input type="date" value={draft.eventDate} onChange={e=>patch("eventDate",e.target.value)}/></label><label>Город, если выбран<input placeholder="Москва" value={draft.city} onChange={e=>patch("city",e.target.value)}/></label><label>Примерно гостей<input type="number" min="1" placeholder="50" value={draft.guestCount} onChange={e=>patch("guestCount",e.target.value)}/></label><label>Выберите тариф<select value={draft.budget} onChange={e=>patch("budget",e.target.value)}><option>START — 1 990 ₽</option><option>PREMIUM — 4 990 ₽</option><option>WOW — 9 990 ₽</option><option>Нужна консультация</option></select></label></div></section>}
    {step===3&&<section><p>АТМОСФЕРА · МОЖНО ПРОПУСТИТЬ</p><h1>Как должно<br/>ощущаться</h1><div className="field-grid"><label>Визуальный характер<select value={draft.selectedStyle} onChange={e=>patch("selectedStyle",e.target.value)}><option>Кинематографичный</option><option>Журнальный и светлый</option><option>Смелый и экспериментальный</option><option>Тёплый и тактильный</option></select></label><label>Музыкальное настроение<select value={draft.musicMood} onChange={e=>patch("musicMood",e.target.value)}><option>Деликатный фон</option><option>Современная классика</option><option>Энергичная электроника</option><option>Без музыки</option></select></label></div><fieldset className="module-picks"><legend>Что можно добавить</legend>{moduleOptions.map(item=><label key={item}><input type="checkbox" checked={draft.modules.includes(item)} onChange={()=>toggleModule(item)}/><span>{item}</span></label>)}</fieldset></section>}
    {step===4&&<section><p>ЗНАКОМСТВО</p><h1>Куда отправить<br/>первую идею?</h1><div className="field-grid"><label>Ваше имя · обязательно<input required value={draft.name} onChange={e=>patch("name",e.target.value)} placeholder="Анна"/></label><label>Контакт для связи · обязательно<input required value={draft.contact} onChange={e=>patch("contact",e.target.value)} placeholder="Телефон, почта или мессенджер"/></label></div><label className="wide-field">Что нам важно знать · необязательно<textarea value={draft.message} onChange={e=>patch("message",e.target.value)} placeholder="Расскажите об идее, героях и деталях, которые хочется сохранить"/></label><label className="honeypot" aria-hidden="true">Ваш сайт<input tabIndex={-1} autoComplete="off" value={draft.website} onChange={e=>patch("website",e.target.value)}/></label><label className="consent"><input type="checkbox" checked={draft.consent} onChange={e=>patch("consent",e.target.checked)}/><span>Я соглашаюсь с <Link href="/privacy" target="_blank">политикой обработки данных</Link></span></label>{status==="error"&&<p className="form-error">Не удалось отправить — проверьте соединение и попробуйте снова</p>}</section>}
    <div className="order-next">{step<4?<button type="button" onClick={()=>setStep(step+1)}>Продолжить <span>→</span></button>:<button disabled={!draft.consent||status==="sending"} type="submit">{status==="sending"?"Отправляем…":"Отправить бриф"} <span>↗</span></button>}<small>Черновик сохраняется на этом устройстве</small></div>
  </form>;
}
