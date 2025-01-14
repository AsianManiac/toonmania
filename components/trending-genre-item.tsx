import Link from "next/link";
import Image from "next/image";

import { HomeToonsProps } from "@/data/home-webtoon";
import makeURLFriendly from "@/helpers/makeurl";

const TrendingGenreItem: React.FC<HomeToonsProps> = ({ ...props }) => {
  const { title, image, author, genre } = props;
  return (
    <Link href={`${makeURLFriendly(genre)}/${makeURLFriendly(title)}`}>
      <div className="flex flex-row justify-start items-center py-1 border-b-[1px] border-gray-300/70 border-spacing-2">
        <div className="h-20 w-20 relative">
          <Image alt={title} src={image} fill />
        </div>
        <div className="items-center flex justify-center w-10">
          <span className="text-base font-semibold">1</span>
        </div>
        <div>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {genre}
          </p>
          <p className="text-lg font-medium dark:text-white">{title}</p>
          <p className="text-sm font-normal dark:text-white">{author}</p>
        </div>
      </div>
    </Link>
  );
};

export default TrendingGenreItem;
