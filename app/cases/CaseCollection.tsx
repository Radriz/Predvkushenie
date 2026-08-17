"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {useState} from "react";
import type {InvitationCase} from "../lib/cases";

type CaseCardItem=Pick<InvitationCase,"slug"|"eventType"|"eventLabel"|"title"|"couple"|"date"|"city"|"image">;

const filters=[{label:"Все",key:"all"},{label:"Свадьбы",key:"wedding"},{label:"Дни рождения",key:"birthday"},{label:"Детские",key:"kids"},{label:"Для бизнеса",key:"business"},{label:"Юбилеи",key:"anniversary"},{label:"Для малыша",key:"baby"}] as const;

export function CaseCollection({items}:{items:CaseCardItem[]}){
  const [active,setActive]=useState<(typeof filters)[number]["key"]>("all");
  const visible=active==="all"?items:items.filter(item=>item.eventType===active);
  return <>
    <nav className="case-filters" aria-label="Фильтры кейсов">{filters.map(filter=><button type="button" className={active===filter.key?"active":""} aria-pressed={active===filter.key} onClick={()=>setActive(filter.key)} key={filter.key}>{filter.label}</button>)}</nav>
    <section className="cases-grid" aria-label="Кейсы">
      {visible.map((item,index)=><Link className="case-card" href={`/cases/${item.slug}`} key={item.slug}>
        <div className="case-card-media"><img src={item.image} alt="" loading={index===0?"eager":"lazy"}/><span>{item.eventLabel}</span></div>
        <div><p>{item.city} · {item.date}</p><h2>{item.title}</h2><span>{item.couple}</span><b>Открыть кейс ↗</b></div>
      </Link>)}
      {visible.length===0?<div className="cases-empty" role="status"><p>Эта часть коллекции готовится</p><span>Новый кейс появится здесь после отдельной визуальной проверки</span></div>:null}
    </section>
  </>;
}
