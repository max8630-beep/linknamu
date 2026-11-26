"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
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

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(links.map((l) => [l.id, 0])),
  );

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옴
  useEffect(() => {
    let cancelled = false;
    fetch("/api/click", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Record<string, number> } | null) => {
        if (!cancelled && data?.counts) setCounts((prev) => ({ ...prev, ...data.counts }));
      })
      .catch(() => {}); // 실패하면 0회 그대로 둠
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (id: string) => {
    trackClick(id);
    // 서버 응답을 기다리지 않고 화면의 숫자를 바로 1 올림
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="flex flex-col gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
