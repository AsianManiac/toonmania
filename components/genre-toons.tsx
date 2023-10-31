"use client";
import qs from "query-string";

import MainToon from "@/components/toonmania/main-toon";
import Container from "@/components/container";
import { useSearchParams } from "next/navigation";
import makeURLFriendly from "@/helpers/makeurl";
import ClientOnly from "./client";
import EmptyState from "./empty-state";

import { toons } from "@/data/toons";
import { Check } from "lucide-react";

const GenreToons = () => {
  const params = useSearchParams();
  const genreParam = params?.get("genre");

  const defaultGenre = "drama";

  // Filter the data based on the 'genre' query parameter
  const filteredToons = genreParam
    ? toons.filter((item) => makeURLFriendly(item.genre) === genreParam)
    : toons.filter((item) => makeURLFriendly(item.genre) === defaultGenre);

  if (filteredToons.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <Container>
      <div className="flex pt-5 justify-between py-2 mt-10 flex-row items-center">
        {filteredToons.slice(0, 1).map((item, index) => (
          <h2
            key={index}
            className={`font-semibold ${makeURLFriendly(
              item.genre
            )} text-xl flex items-center`}
          >
            {item.genre}
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
        {filteredToons.slice(0, 5).map((item, index) => (
          <MainToon
            key={index}
            image={item.image}
            title={item.name}
            genre={item.genre}
            icons={item.icons}
            likes={item.likes}
            author={item.author}
          />
        ))}
      </div>
    </Container>
  );
};

export default GenreToons;
