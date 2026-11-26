"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  /** 현재 클릭 수 */
  count: number;
  onClick: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative flex h-[4.5rem] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-[#ffe4cf]/90 to-[#fcc9ae]/75 px-16 text-center text-lg shadow-[0_4px_20px_rgba(180,120,90,0.08)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-1 hover:from-[#ffead9] hover:to-[#fdd3bc]/90 hover:shadow-[0_10px_30px_rgba(180,120,90,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0 dark:border-white/10 dark:from-orange-900/25 dark:to-rose-900/20 dark:hover:from-orange-900/35 dark:hover:to-rose-900/30 dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
    >
      <span className="block w-full truncate">{link.title}</span>
      {link.description && (
        <span className="mt-0.5 block w-full truncate text-sm text-stone-500 dark:text-stone-400">
          {link.description}
        </span>
      )}
      <span
        aria-label={`클릭 ${count}회`}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-xs tabular-nums text-stone-500 dark:text-stone-400"
      >
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
