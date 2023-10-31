import ClientOnly from "@/components/client";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import { homeDateToon } from "@/data/home-webtoon";
import ToonDetailsItem from "./toon-detail-item";

interface IParams {
  name: string;
  toonId: string;
}

const ToonDetails = async ({ params }: { params: IParams }) => {
  const toon = await homeDateToon;
  if (!toon) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <p className="m-auto h-8">
        {params.toonId} {params.name}
      </p>
      <ToonDetailsItem />
    </ClientOnly>
  );
};

export default ToonDetails;
