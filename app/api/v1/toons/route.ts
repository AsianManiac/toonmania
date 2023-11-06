import { NextResponse } from "next/server";
import db from "@/lib/db";
import getCurrentUser from "@/actions/getCurrentUser";
import { slugify } from "@/helpers/makeurl";
export async function POST(req: Request) {
  function slap(rannd: string) {
    const raa = Math.random() < 0.5 ? -3 : -2;
    return rannd.slice(raa);
  }
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = currentUser.id;
    const { title, author } = await req.json();

    const titleUrl = slugify(title);
    const rand = Date.now().toString();
    const number = slap(rand);

    const toon = await db.webtoon.create({
      data: {
        authorId: author,
        title,
        slug: titleUrl,
        titleNo: number,
        userId,
      },
    });
    return NextResponse.json(toon);
  } catch (error) {
    console.log("[TOONS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
