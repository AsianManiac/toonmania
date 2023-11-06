import db from "@/lib/db";
import { Genre, Webtoon } from "@prisma/client";

export type ToonWithGenre = Webtoon & {
  genre: Genre | null;
  episode: { id: string }[];
};

type GetToon = {
  title: string;
  genre: string;
};

export const getToon = async ({
  title,
  genre,
}: GetToon): Promise<ToonWithGenre[] | undefined> => {
  try {
    const cat = await db.genre.findFirst({
      where: {
        slug: genre,
      },
    });
    const toons = await db.webtoon.findMany({
      where: {
        isPublished: true,
        title: {
          search: title,
        },
      },
      include: {
        genre: {
          where: {
            slug: {
              search: genre,
            },
          },
        },
        episodes: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
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
