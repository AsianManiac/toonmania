import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { toonId: string } }
) {
  try {
    const user = await getCurrentUser();

    const userId = user?.id;

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const toon = await db.webtoon.findUnique({
      where: {
        id: params.toonId,
        userId,
      },
      include: {
        episodes: true,
      },
    });

    if (!toon) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedEpisode = toon.episodes.some(
      (episode) => episode.isPublished
    );

    if (
      !toon ||
      !toon.title ||
      !toon.description ||
      !toon.genreId ||
      !toon.authorId ||
      !toon.coverImage ||
      !hasPublishedEpisode
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const unpublishedToon = await db.webtoon.update({
      where: {
        id: params.toonId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(unpublishedToon);
  } catch (error) {
    console.log("[TOON_PUBLISH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
