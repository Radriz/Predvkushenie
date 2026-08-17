"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({error,reset}:{error:Error&{digest?:string};reset:()=>void}){
  useEffect(()=>{console.error(error)},[error]);
  return <main className="error-page"><p>ПРИГЛАШЕНИЕ НА ПАУЗЕ</p><h1>Вернём сцену<br/>одним касанием.</h1><button type="button" onClick={reset}>Попробовать снова ↗</button><Link href="/">На главную</Link></main>;
}
