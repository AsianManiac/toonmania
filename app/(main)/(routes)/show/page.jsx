
import { promises as fs } from "fs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import path from "path";

function Numeric_Sort(arr) {
  let i = 0, j
  while (i < arr.length) {
    j = i + 1
    while (j < arr.length) {
      if (arr[j] < arr[i]) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      j++
    }
    i++
  }
}

const ReaderPage = async () => {

  const webtoonFolder = path.join(process.cwd(), 'public', 'webtoon', 'originals', 'Morgana_and_Oz', '01')
  const imageFiles = await fs.readdir(webtoonFolder)
  imageFiles.sort((a, b) => b - a)
  console.log(imageFiles)

  return (
    <WebtoonEpisode imageFiles={imageFiles} />
  )
}
const WebtoonEpisode = ({ imageFiles }) => {

  return (
    <div className="m-auto flex flex-col justify-center items-center">
      <p className="m-auto h-8"> Tay JunJo</p>
      {imageFiles?.map((image) => (
        <img
          key={image}
          width={"60%"}
          height={"100%"}
          className="w-[60vw]"
          src={`/webtoon/originals/Morgana_and_Oz/01/${image}`}
          alt={`Image `}
        />
      ))}
    </div>
  );
}


export default ReaderPage;
