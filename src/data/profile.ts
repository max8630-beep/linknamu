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

// ⚠️ 보여 주기용 더미 값입니다. 나중에 실제 내용으로 바꿔 주세요.
export const profile: Profile = {
  name: "홍길동",
  bio: "더미 소개 문구입니다",
  image: "/avatar-placeholder.svg",
};

export const links: LinkItem[] = [
  { id: "link-1", title: "링크 카드 1", url: "https://example.com/1" },
  { id: "link-2", title: "링크 카드 2", url: "https://example.com/2" },
  { id: "link-3", title: "링크 카드 3", url: "https://example.com/3" },
];
