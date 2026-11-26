import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-gray-900 bg-gray-100 dark:border-gray-100 dark:bg-gray-800 sm:h-44 sm:w-44">
        {profile.image ? (
          <Image
            src={profile.image}
            alt={`${profile.name} 프로필 사진`}
            fill
            sizes="176px"
            className="object-cover"
            // SVG는 이미지 최적화 대상이 아니므로 그대로 사용
            unoptimized={profile.image.endsWith(".svg")}
            priority
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-4xl font-semibold text-gray-500 dark:text-gray-400">
            {profile.name.charAt(0)}
          </span>
        )}
      </div>
      <h1 className="mt-5 text-xl font-bold sm:text-2xl">{profile.name}</h1>
      {profile.bio && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{profile.bio}</p>
      )}
    </header>
  );
}
