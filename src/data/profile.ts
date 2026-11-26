export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio?: string;
  /** public/ 폴더 기준 경로 (예: "/profile.jpg"). 비워두면 이름 첫 글자를 보여줍니다. */
  image?: string;
};

// 프로필 정보와 링크 목록
export const profile: Profile = {
  name: "최성웅",
  bio: "클로드코드 배우는 직장인",
  image: "/claude-logo.svg",
};

export const links: LinkItem[] = [
  { id: "link-1", title: "네일맛집", url: "https://www.instagram.com/nail.laon/" },
  { id: "link-2", title: "대전맛집1", url: "https://m.blog.naver.com/jyjyjeong/223664888486" },
  { id: "link-3", title: "대전맛집2", url: "https://www.instagram.com/pastabar.happening/" },
];
