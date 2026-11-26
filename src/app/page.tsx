import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 글래스 카드 뒤로 은은하게 비치는 배경 빛 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl dark:bg-orange-900/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-[28rem] h-80 w-80 rounded-full bg-rose-200/40 blur-3xl dark:bg-rose-900/20"
      />

      <main className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-8 pb-16 pt-20 sm:pt-28">
        <div className="absolute right-6 top-6">
          <ThemeToggle />
        </div>

        <ProfileHeader profile={profile} />

        <nav aria-label="링크 목록" className="mt-12">
          <ul className="flex flex-col gap-5">
            {links.map((link) => (
              <li key={link.id}>
                <LinkCard link={link} />
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}
