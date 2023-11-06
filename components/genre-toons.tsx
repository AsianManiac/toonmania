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
};

interface GenreToonsProps {
  items: ToonsWithGenre[];
}

const GenreToons = ({ items }: GenreToonsProps) => {
  return (
    <Container>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-20">
        {items?.map((item) => (
          <MainToon
            key={item.id}
            slug={item.slug}
            image={item.coverImage}
            title={item.title}
            genre={item?.genre?.name}
            titleNo={item.titleNo}
            // likes={item.}
            author={item.authorId}
          />
        ))}
      </div>
    </Container>
  );
};

export default GenreToons;
