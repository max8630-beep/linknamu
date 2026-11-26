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

// 프로필 정보 (링크 목록은 아직 더미 값입니다)
export const profile: Profile = {
  name: "최성웅",
  bio: "클로드코드 배우는 직장인",
  image: "/claude-logo.svg",
};

export const links: LinkItem[] = [
  { id: "link-1", title: "링크 카드 1", url: "https://example.com/1" },
  { id: "link-2", title: "링크 카드 2", url: "https://example.com/2" },
  { id: "link-3", title: "링크 카드 3", url: "https://example.com/3" },
];
