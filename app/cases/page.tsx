import type {Metadata} from "next";
import {SiteFooter,SiteHeader} from "../components/SiteHeader";
import {invitationCases} from "../lib/cases";
import {CaseCollection} from "./CaseCollection";

export const metadata:Metadata={title:"Кейсы — ПРЕДВКУСИЕ",description:"Коллекция готовых историй и самостоятельных сайтов-приглашений ПРЕДВКУСИЕ"};

export default function CasesPage(){return <main className="cases-page">
  <SiteHeader/>
  <section className="cases-hero"><p>КОЛЛЕКЦИЯ ПРИГЛАШЕНИЙ</p><h1>Истории, которые<br/><em>уже начались</em></h1><span>Каждый кейс — самостоятельный мир с собственным ритмом, сценарием и настроением</span></section>
  <CaseCollection items={invitationCases.map(({slug,eventType,eventLabel,title,couple,date,city,image})=>({slug,eventType,eventLabel,title,couple,date,city,image}))}/>
  <section className="cases-progress"><p>КОЛЛЕКЦИЯ РАСТЁТ</p><h2>{invitationCases.length} из<br/>120 историй</h2><span>Новые истории добавляются по одной — каждая проходит отдельную визуальную и техническую проверку</span></section>
  <SiteFooter/>
</main>}
