import ClientOnly from "@/components/client";
import EmptyState from "@/components/empty-state";
import GenreToons from "@/components/genre-toons";
import { homeDateToon } from "@/data/home-webtoon";

const PopularPage = async () => {
  const toons = await homeDateToon;

  if (toons.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return <GenreToons />;
};

export default PopularPage;
