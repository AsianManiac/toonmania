import { getToon } from "@/actions/getToons";
import ClientOnly from "@/components/client";
import EmptyState from "@/components/empty-state";
import GenreToons from "@/components/genre-toons";
import { UserMenuProps } from "@/components/user-menu";
import { homeDateToon } from "@/data/home-webtoon";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { useCallback } from "react";

interface GenrePageProps {
  searchParams: {
    title: string;
    genre: string;
  };
  currentUser: User;
}

const PopularPage = async ({ searchParams, currentUser }: GenrePageProps) => {
  // const toons = await homeDateToon;
  const userId = "fc035e15-c26a-45b1-b266-779dc10c00ad";

  const toon = await getToon({
    ...searchParams,
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
      <GenreToons items={toon} />
    </>
  );
};

export default PopularPage;
