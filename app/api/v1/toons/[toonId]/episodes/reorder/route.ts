import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { toonId: string } }
) {
  try {
    const user = await getCurrentUser();

    const userId = user?.id;
    const { list } = await req.json();

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

    for (let item of list) {
      await db.episode.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[EPISODES]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
