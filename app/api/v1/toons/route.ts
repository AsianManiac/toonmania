import { NextResponse } from "next/server";
import db from "@/lib/db";
import getCurrentUser from "@/actions/getCurrentUser";
export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = currentUser.id;
    const { title, author } = await req.json();

    const toon = await db.webtoon.create({
      data: {
        authorId: author,
        title,
        userId,
      },
    });
    return NextResponse.json(toon);
  } catch (error) {
    console.log("[TOONS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
