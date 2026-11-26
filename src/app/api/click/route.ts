import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getMongoClient } from "@/lib/mongodb";

// 클릭 수는 항상 최신 값이어야 하므로 캐시하지 않음
export const dynamic = "force-dynamic";

const validIds = new Set(links.map((l) => l.id));

type ClickDoc = { linkId: string; count: number; lastClickedAt?: Date };

async function getClicksCollection() {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null; // DB 미설정 시 집계를 건너뜀
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "linknamu").collection<ClickDoc>("clicks");
}

/** 모든 링크의 현재 클릭 수를 한 번에 반환: { counts: { "link-1": 42, ... } } */
export async function GET() {
  const counts: Record<string, number> = Object.fromEntries(links.map((l) => [l.id, 0]));

  try {
    const clicks = await getClicksCollection();
    if (clicks) {
      const docs = await clicks
        .find({ linkId: { $in: [...validIds] } }, { projection: { _id: 0, linkId: 1, count: 1 } })
        .toArray();
      for (const doc of docs) counts[doc.linkId] = doc.count ?? 0;
    }
    return NextResponse.json({ counts }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("클릭 수 조회 실패", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

/** 링크 클릭 1회 집계: body { id: "link-1" } */
export async function POST(req: Request) {
  let id: unknown;
  try {
    ({ id } = await req.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크" }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    if (!clicks) return NextResponse.json({ ok: true, skipped: true });

    const doc = await clicks.findOneAndUpdate(
      { linkId: id },
      { $inc: { count: 1 }, $set: { lastClickedAt: new Date() } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ ok: true, count: doc?.count ?? null });
  } catch (err) {
    console.error("클릭 집계 실패", err);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
