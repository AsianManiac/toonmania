import db from "@/lib/db";
import { Genre, Webtoon } from "@prisma/client";

type ToonWithGenre = Webtoon & {
  genres: Genre;
  episodes: { id: string };
};

type GetToon = {
  userId: string;
  title?: string;
  genreId?: string;
};

export const getToon = async ({
  userId,
  title,
  genreId,
}: GetToon): Promise<ToonWithGenre[]> => {
  try {
    const toons = await db.webtoon.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        genreId,
      },
      include: {
        genre: true,
        episodes: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log("GET_TOONS", error);
    return [];
  }
};
