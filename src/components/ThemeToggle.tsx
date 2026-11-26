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
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-lg transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      {/* 하이드레이션 전에는 아이콘을 비워 깜빡임 방지 */}
      {dark === null ? null : dark ? "☀️" : "🌙"}
    </button>
  );
}
