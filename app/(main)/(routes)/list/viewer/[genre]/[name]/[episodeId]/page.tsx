import { WebtoonEpisode } from "@/components/toonmania/main-toon";
import sortedArray from "@/helpers/sortedArray";
import fs from "fs";
import path from "path";

const ReaderPage = async ({ params }: { params: IParams }) => {
  const webtoonFolder = path.join(
    process.cwd(),
    "public",
    "webtoon",
    "originals",
    `${params.name}`,
    `${params.episodeId}`
  );
  const imageFiles = await fs.readdirSync(webtoonFolder);

  // imageFiles.sort((a, b) => b - a)
  imageFiles.sort(sortedArray);
  console.log(imageFiles);

  return (
    <>
      <WebtoonEpisode image={imageFiles} />
    </>
  );
};

interface IParams {
  genre: string;
  name: string;
  episodeId: string;
}

export default ReaderPage;
