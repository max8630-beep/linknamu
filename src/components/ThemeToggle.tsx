"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // 저장 실패(시크릿 모드 등)는 무시
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/40 text-base backdrop-blur-md transition duration-300 hover:bg-white/60 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10"
    >
      {/* 하이드레이션 전에는 아이콘을 비워 깜빡임 방지 */}
      {dark === null ? null : dark ? "☀️" : "🌙"}
    </button>
  );
}
