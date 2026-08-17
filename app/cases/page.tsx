/* eslint-disable @next/next/no-img-element */
import type {Metadata} from "next";
import Link from "next/link";
import {SiteFooter,SiteHeader} from "../components/SiteHeader";
import {invitationCases} from "../lib/cases";

export const metadata:Metadata={title:"Кейсы — ПРЕДВКУСИЕ",description:"Коллекция готовых историй и самостоятельных сайтов-приглашений ПРЕДВКУСИЕ"};

const filters=["Все","Свадьбы","Дни рождения","Детские","Для бизнеса","Юбилеи","Для малыша"];

export default function CasesPage(){return <main className="cases-page">
  <SiteHeader/>
  <section className="cases-hero"><p>КОЛЛЕКЦИЯ ПРИГЛАШЕНИЙ</p><h1>Истории, которые<br/><em>уже начались</em></h1><span>Каждый кейс — самостоятельный мир с собственным ритмом, сценарием и настроением</span></section>
  <nav className="case-filters" aria-label="Фильтры кейсов">{filters.map((filter,index)=><button type="button" className={index===0?"active":""} disabled={index>1} key={filter}>{filter}</button>)}</nav>
  <section className="cases-grid" aria-label="Все кейсы">
    {invitationCases.map((item,index)=><Link className="case-card" href={`/cases/${item.slug}`} key={item.slug}>
      <div className="case-card-media"><img src={item.image} alt="" loading={index===0?"eager":"lazy"}/><span>{String(index+1).padStart(2,"0")} · {item.eventLabel}</span></div>
      <div><p>{item.city} · {item.date}</p><h2>{item.title}</h2><span>{item.couple}</span><b>Открыть кейс ↗</b></div>
    </Link>)}
  </section>
  <section className="cases-progress"><p>КОЛЛЕКЦИЯ РАСТЁТ</p><h2>Первый из<br/>ста двадцати</h2><span>Новые истории добавляются по одной — каждая проходит отдельную визуальную и техническую проверку</span></section>
  <SiteFooter/>
</main>}
