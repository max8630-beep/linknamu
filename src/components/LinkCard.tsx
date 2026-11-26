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
      className="flex h-16 w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-gray-900 bg-white px-5 py-4 text-center font-medium transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 active:translate-y-0 dark:border-gray-100 dark:bg-gray-900"
    >
      {link.title}
      {link.description && (
        <span className="mt-0.5 block w-full truncate text-xs font-normal text-gray-500 dark:text-gray-400">
          {link.description}
        </span>
      )}
    </a>
  );
}
