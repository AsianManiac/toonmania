"use client";

import Container from "@/components/container";
import MainToon from "@/components/toonmania/main-toon";
import makeURLFriendly, { slugify } from "@/helpers/makeurl";
import { useSearchParams } from "next/navigation";
import ClientOnly from "./client";
import EmptyState from "./empty-state";

import { toons } from "@/data/toons";
import db from "@/lib/db";
import { Check } from "lucide-react";
import { Genre, Webtoon } from "@prisma/client";

type ToonsWithGenre = Webtoon & {
  genre: Genre | null;
  episode: { id: string }[];
};

interface GenreToonsProps {
  items: ToonsWithGenre[];
}

const GenreToons = ({ items }: GenreToonsProps) => {
  const params = useSearchParams();
  const genreParam = params?.get("genre");

  const defaultGenre = "drama";
  const mee = "I have a new project & it ha 100% success rate!";
  console.log(slugify(mee));
  // Filter the data based on the 'genre' query parameter
  const filteredToons = genreParam
    ? items?.filter((item) => item.genre?.slug === genreParam)
    : items?.filter((item) => item.genre?.slug === defaultGenre);

  if (items?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <Container>
      <div className="flex pt-5 justify-between py-2 mt-10 flex-row items-center">
        {filteredToons?.map((item, index) => (
          <h2
            key={index}
            className={`font-semibold ${item.genre?.slug} text-xl flex items-center`}
          >
            {item.genre?.name}
          </h2>
        ))}
        <span className="flex items-center gap-x-2">
          Order by{" "}
          <span>
            <Check className="h-5 w-5" />
          </span>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-20">
        {filteredToons?.map((item) => (
          <MainToon
            key={item.id}
            image={item.coverImage}
            title={item.title}
            genre={item?.genre?.name}
            // icons={item.icons}
            // likes={item.}
            author={item.authorId}
          />
        ))}
      </div>
    </Container>
  );
};

export default GenreToons;
