import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { toonId: string } }
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

    const deletedToon = await db.webtoon.delete({
      where: {
        id: params.toonId,
      },
    });

    return NextResponse.json(deletedToon);
  } catch (error) {
    console.log("[TOON_DELETE_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { toonId: string } }
) {
  try {
    const user = await getCurrentUser();

    const userId = user?.id;
    const { toonId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const toon = await db.webtoon.update({
      where: {
        id: toonId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(toon);
  } catch (error) {
    console.log("[TOON_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
