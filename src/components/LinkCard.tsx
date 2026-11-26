"use client";

import type { LinkItem } from "@/data/profile";

function trackClick(id: string) {
  const body = JSON.stringify({ id });
  // 새 탭으로 이동해도 전송되도록 sendBeacon 우선 사용
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/click", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick(link.id)}
      className="flex h-[4.5rem] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-[#ffe4cf]/90 to-[#fcc9ae]/75 px-6 text-center text-lg shadow-[0_4px_20px_rgba(180,120,90,0.08)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-1 hover:from-[#ffead9] hover:to-[#fdd3bc]/90 hover:shadow-[0_10px_30px_rgba(180,120,90,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0 dark:border-white/10 dark:from-orange-900/25 dark:to-rose-900/20 dark:hover:from-orange-900/35 dark:hover:to-rose-900/30 dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
    >
      {link.title}
      {link.description && (
        <span className="mt-0.5 block w-full truncate text-sm text-stone-500 dark:text-stone-400">
          {link.description}
        </span>
      )}
    </a>
  );
}
