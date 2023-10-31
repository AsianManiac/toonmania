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

    const unpublishedEpisode = await db.episode.update({
      where: {
        id: params.episodeId,
        webtoonId: params.toonId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedEpisodesInToon = await db.episode.findMany({
      where: {
        webtoonId: params.toonId,
        isPublished: true,
      },
    });

    if (!publishedEpisodesInToon.length) {
      await db.webtoon.update({
        where: {
          id: params.toonId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(unpublishedEpisode);
  } catch (error) {
    console.log("[EPISODE_PUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
