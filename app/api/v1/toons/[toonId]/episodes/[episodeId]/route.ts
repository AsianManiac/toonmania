import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
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

    if (!episode) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const deletedEpisode = await db.episode.delete({
      where: {
        id: params.episodeId,
      },
    });

    const publishedEpisode = await db.episode.findMany({
      where: {
        webtoonId: params.toonId,
        isPublished: true,
      },
    });

    if (!publishedEpisode.length) {
      await db.webtoon.update({
        where: {
          id: params.toonId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedEpisode);
  } catch (error) {
    console.log("[EPISODE_DELETE_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { toonId: string; episodeId: string } }
) {
  try {
    const user = await getCurrentUser();

    const userId = user?.id;
    const { isPublished, ...values } = await req.json();

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

    const episode = await db.episode.update({
      where: {
        id: params.episodeId,
        webtoonId: params.toonId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(episode);
  } catch (error) {
    console.log("[TOON_EPISODE_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
