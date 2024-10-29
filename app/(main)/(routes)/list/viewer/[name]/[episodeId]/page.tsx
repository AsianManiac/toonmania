import { getEpisode } from "@/actions/getEpisode";
import Banner from "@/components/banner";
import { WebtoonEpisode } from "@/components/toonmania/main-toon";
import sortedArray from "@/helpers/sortedArray";
import fs from "fs";
import { redirect } from "next/navigation";
import path from "path";
import { BiPlayCircle } from "react-icons/bi";

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
  // console.log(imageFiles);

  const { episode, toons, attachments, nextEpisode } = await getEpisode({
    toon: params.name,
    episodes: params.episodeId,
  });

  if (!toons || !episode) {
    redirect(`/list/drama/${params.name}`);
  }

  const isLocked = !episode?.isFree;
  console.log(attachments);

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
                  <BiPlayCircle fill="green" className="w-5 h-5" />
                  <audio
                    src={`/webtoon/attachments/soundtracks/${attach.url}`}
                    autoPlay
                    muted={false}
                  >
                    Play now
                  </audio>
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
