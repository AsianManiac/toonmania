import db from "@/lib/db";
import { Attachments, Episode } from "@prisma/client";

interface GetEpisodeProps {
  toon: string;
  episodes: string;
}

export const getEpisode = async ({ toon, episodes }: GetEpisodeProps) => {
  try {
    const toons = await db.webtoon.findUnique({
      where: {
        slug: toon,
        isPublished: true,
      },
    });

    const isFreed = await db.episode.findUnique({
      where: {
        episodeUrl: episodes,
        webtoonId: toons?.id,
        isFree: true,
      },
    });

    const episode = await db.episode.findUnique({
      where: {
        episodeUrl: episodes,
        isPublished: true,
        isFree: true,
      },
    });

    if (!toons || !episode) {
      throw new Error("Toon and episode not found");
    }

    let attachments: Attachments[] = [];
    let nextEpisode: Episode | null = null;

    if (isFreed) {
      attachments = await db.attachments.findMany({
        where: {
          episodeId: episode.id,
        },
      });
    }

    if (episode.isFree) {
      nextEpisode = await db.episode.findFirst({
        where: {
          isPublished: true,
          webtoonId: toons.id,
          position: {
            gt: episode?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    return {
      episode,
      toons,
      attachments,
      nextEpisode,
    };
  } catch (error) {
    console.log("GET_EPISODE", error);
    return {
      episode: null,
      toons: null,
      attachments: [],
      nextEpisode: null,
    };
  }
};
