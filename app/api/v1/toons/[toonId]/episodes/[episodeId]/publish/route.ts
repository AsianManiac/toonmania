import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { toonId: string; episodeId: string } }
) {
  try {
    const user = await getCurrentUser();

    const userId = user?.id;

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

    const episode = await db.episode.findUnique({
      where: {
        id: params.episodeId,
        webtoonId: params.toonId,
      },
    });

    if (
      !episode ||
      !episode.title ||
      !episode.description ||
      !episode.imageUrl ||
      !episode.episodeNumber ||
      !episode.episodeUrl
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedEpisode = await db.episode.update({
      where: {
        id: params.episodeId,
        webtoonId: params.toonId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedEpisode);
  } catch (error) {
    console.log("[EPISODE_PUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
