import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    // 모바일: 화면 전체 / 넓은 화면: 그림.png처럼 둥근 테두리 카드 안에 표시
    <div className="flex min-h-screen justify-center sm:items-center sm:py-10">
      <main className="relative flex min-h-screen w-full max-w-md flex-col bg-white px-6 pb-12 pt-16 dark:bg-gray-900 sm:min-h-[640px] sm:rounded-3xl sm:border-2 sm:border-gray-900 sm:shadow-sm sm:dark:border-gray-100">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>

        <ProfileHeader profile={profile} />

        <nav aria-label="링크 목록" className="mt-8">
          <ul className="flex flex-col gap-6">
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
