import { HomeToonsProps } from "@/data/home-webtoon";
import Image from "next/image";

const TrendingGenreItem: React.FC<HomeToonsProps> = ({...props}) => {
    const { title, image, author, genre } = props;
    return ( 
        <div className="flex flex-row justify-start items-center py-1 border-b-[1px] border-gray-300/70 border-spacing-2">
            <div className="h-20 w-20 relative">
                <Image
                    alt={title}
                    src={image}
                    fill
                    objectFit="cover"
                />
            </div>
            <div className="items-center flex justify-center w-10">
                <span className="text-base font-semibold">1</span>
            </div>
            <div>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{genre}</p>
                <p className="text-lg font-medium dark:text-white">{title}</p>
                <p className="text-sm font-normal dark:text-white">{author}</p>
            </div>
        </div>
     );
}
 
export default TrendingGenreItem;