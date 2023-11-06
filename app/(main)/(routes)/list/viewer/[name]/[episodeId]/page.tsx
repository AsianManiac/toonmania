import { getEpisode } from "@/actions/getEpisode";
import { getToon } from "@/actions/getToons";
import Banner from "@/components/banner";
import { WebtoonEpisode } from "@/components/toonmania/main-toon";
import sortedArray from "@/helpers/sortedArray";
import db from "@/lib/db";
import fs from "fs";
import { Music } from "lucide-react";
import { redirect } from "next/navigation";
import path from "path";
import { Player } from "./_components/Player";

const ReaderPage = async ({
  params,
}: {
  params: { name: string; episodeId: string };
}) => {
  const webtoonFolder = path.join(
    process.cwd(),
    "public",
    "webtoon",
    "originals",
    `${params.name}`,
    `${params.episodeId}`
  );
  const imageFiles = fs.readdirSync(webtoonFolder);
  // imageFiles.sort((a, b) => b - a)
  imageFiles.sort(sortedArray);
  console.log(imageFiles);

  const { episode, toons, attachments, nextEpisode } = await getEpisode({
    toon: params.name,
    episodes: params.episodeId,
  });

  if (!toons || !episode) {
    redirect(`/list/drama/${params.name}`);
  }

  const isLocked = !episode?.isFree;

  return (
    <>
      {isLocked && (
        <Banner
          variant={"danger"}
          lable="You have not subscribed to view this toon episode"
        />
      )}
      {!isLocked && (
        <>
          <div className="relative mx-auto md:w-[60vw] w-full z-10 m-auto flex justify-end items-center">
            <div className="absolute top-12 right-12">
              {attachments.map((attach) => (
                <>
                  <Player playing={true} paused={true} />
                </>
              ))}
            </div>
          </div>
          <WebtoonEpisode image={imageFiles} />
        </>
      )}
    </>
  );
};

interface IParams {
  genre: string;
  name: string;
  episodeId: string;
}

export default ReaderPage;
