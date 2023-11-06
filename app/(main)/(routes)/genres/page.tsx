import { getToon } from "@/actions/getToons";
import ClientOnly from "@/components/client";
import EmptyState from "@/components/empty-state";
import GenreToons from "@/components/genre-toons";
import Heading from "@/components/heading";
import db from "@/lib/db";
import { User, Webtoon } from "@prisma/client";

interface GenrePageProps {
  searchParams: {
    title: string;
    genre: string;
  };
}

const PopularPage = async ({ searchParams }: GenrePageProps) => {
  // const toons = await getToon({
  //   ...searchParams,
  // });

  const cat = await db.genre.findFirst({
    where: {
      slug: searchParams.genre,
    },
  });
  const toon = await db.webtoon.findMany({
    where: {
      isPublished: true,
      title: {
        search: searchParams.title,
      },
      genreId: {
        search: cat?.id,
      },
    },
    include: {
      genre: {
        where: {
          slug: {
            search: searchParams.genre,
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

  if (toon?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <>
      {!toon ? (
        <div className="pt-14">
          <Heading title="No toons found" center />
        </div>
      ) : (
        <GenreToons items={toon} />
      )}
    </>
  );
};

export default PopularPage;
