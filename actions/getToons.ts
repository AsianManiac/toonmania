import db from "@/lib/db";
import { Genre, Webtoon } from "@prisma/client";

export type ToonWithGenre = Webtoon & {
  genre: Genre | null;
  episode: { id: string }[];
};

type GetToon = {
  title?: string;
  genre?: string;
};

export const getToon = async ({
  title,
  genre,
}: GetToon): Promise<ToonWithGenre[]> => {
  try {
    const toons = await db.webtoon.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        genreId: genre,
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
