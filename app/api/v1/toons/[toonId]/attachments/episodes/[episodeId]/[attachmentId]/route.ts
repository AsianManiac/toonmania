import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { toonId: string; attachmentId: string; episodeId: string } }
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

    const attachment = await db.attachments.delete({
      where: {
        id: params.attachmentId,
        toonId: params.toonId,
        episodeId: params.episodeId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[ATTACMENT_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
