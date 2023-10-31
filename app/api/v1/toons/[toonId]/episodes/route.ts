import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { toonId: string } }
) {
  try {
    const user = await getCurrentUser();

    const userId = user?.id;
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const toonOwner = await db.webtoon.findUnique({
      where: {
        id: params.toonId,
        userId,
      },
    });

    if (!toonOwner) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const lastEpisode = await db.episode.findFirst({
      where: {
        webtoonId: params.toonId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastEpisode ? lastEpisode.position + 1 : 1;

    const episode = await db.episode.create({
      data: {
        title,
        webtoonId: params.toonId,
        position: newPosition,
      },
    });

    return NextResponse.json(episode);
  } catch (error) {
    console.log("[EPISODES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
