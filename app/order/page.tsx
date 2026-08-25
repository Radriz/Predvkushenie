import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { OrderForm } from "../components/OrderForm";

export const metadata:Metadata={title:"Обсудить событие — ПРЕДВКУСИЕ",description:"Расскажите о событии — мы подготовим первую идею кинематографичного приглашения.",alternates:{canonical:"/order"}};
export default function OrderPage(){return <main className="order-page"><header><Link className="brand" href="/">ПРЕДВКУСИЕ<span>°</span></Link><Link href="/">Закрыть ×</Link></header><Suspense fallback={<div className="order-loading">Готовим бриф…</div>}><OrderForm/></Suspense></main>}
