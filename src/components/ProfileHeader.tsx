import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-white/60 shadow-[0_8px_30px_rgba(180,120,90,0.18)] ring-4 ring-white/70 dark:bg-white/10 dark:ring-white/10 sm:h-32 sm:w-32">
        {profile.image ? (
          <Image
            src={profile.image}
            alt={`${profile.name} 프로필 사진`}
            fill
            sizes="128px"
            className="object-cover"
            // SVG는 이미지 최적화 대상이 아니므로 그대로 사용
            unoptimized={profile.image.endsWith(".svg")}
            priority
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-4xl font-semibold text-stone-400 dark:text-stone-500">
            {profile.name.charAt(0)}
          </span>
        )}
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{profile.name}</h1>
      {profile.bio && (
        <p className="mt-2 text-base text-stone-500 dark:text-stone-400">{profile.bio}</p>
      )}
    </header>
  );
}
