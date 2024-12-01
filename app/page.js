"use client";
import dynamic from "next/dynamic";

const TelegramApp = dynamic(() => import("./components/TelegramApp"), {
  ssr: false,
});

export default function Home() {
  return <TelegramApp />;
}
