import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { toonId: string; episodeId: string } }
) {
  try {
    const user = await getCurrentUser();

    const userId = user?.id;
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const toonOwner = await db.webtoon.findUnique({
      where: {
        id: params.toonId,
        userId: userId,
      },
    });

    if (!toonOwner) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const attachment = await db.attachments.create({
      data: {
        url,
        name: url.split("/").pop(),
        toonId: params.toonId,
        episodeId: params.episodeId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[TOON_ID_ATTACMENTS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
