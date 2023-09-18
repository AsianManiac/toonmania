import Image from "next/image";
import { ChevronRight, HeartIcon } from "lucide-react";

import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"

import { HomeToonsProps, homeDateToon } from "@/data/home-webtoon";
import React from "react";
import Link from "next/link";
import makeURLFriendly from "@/helpers/makeurl";

interface GenreHeadProps {
    genre: String;
    text: String;
}
export const GenreHead = ({
    genre,
    text
}: GenreHeadProps) => {
    return (
        <div className={`lg:w-48 w-36 lg:h-48 h-36 hm-${makeURLFriendly(genre)} cursor-pointer`}>
            <div className="flex flex-col justify-between text-white">
                <div className="pt-4 pl-4 pb-6 pr-4 flex flex-row items-center justify-between">
                    <p className="font-semibold lg:text-lg text-sm">{genre}</p>
                    <ChevronRight size={20}/>
                </div>
                <div className="pt-4 pl-4 lg:-mt-0 -mt-3 pr-4">
                    <p className="lg:text-sm text-xs font-normal">{text}</p>
                </div>
            </div>
        </div>
    )
}

const Datetoons: React.FC<HomeToonsProps> = ({ ...props }) => {
      const { image, title, author, likes, genre, shortSummary, longSummary } = props
    return ( 
        <>
            <Link href={`${makeURLFriendly(genre)}/${makeURLFriendly(title)}`}>
                <Card className="lg:w-48 w-36 rounded-none group opacity-100 group-hover:opacity-0 transition-opacity duration-200 relative cursor-pointer">
                    <CardContent className="relative p-0">
                        <Image
                            src={image}
                            width={100}
                            height={100}
                            alt={title}
                            className="w-full"
                        />
                        <div className="absolute lg:top-[14px] top-2 px-4">
                            <CardTitle className="font-medium text-sm lg:text-[15px] pb-1">{title}</CardTitle>
                            <p className="text-sm flex items-center">
                                <span>
                                <HeartIcon size={"16"} fill="#00dc64" className="text-[#00dc64]" />
                                </span>
                                <span className="text-[#00dc64] font-medium lg:text-xs text-[10px]"> {likes} </span>
                            </p>
                        </div>
                        <div className="absolute bottom-5 px-4">
                            <p className={`text-xs font-medium ${makeURLFriendly(genre)}`}>{genre}</p>
                        </div>
                    </CardContent>
                    <div className={`absolute top-0 left-0 w-full h-full bg-${makeURLFriendly(genre)} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                        <div className="pt-4 pl-4 pb-6 pr-4 text-white">
                            <p className="font-medium text-[15px]">{title}</p>
                            <p className="font-normal text-xs">{author}</p>
                            <p className="border-b-[1px] border-white w-5 py-1"></p>
                            {shortSummary == "" ? ( 
                                <p className="text-[10px] font-normal pt-1 line-clamp-4">
                                    {longSummary}
                                </p>
                            ) : (
                                <p className="text-[10px] font-normal pt-1 line-clamp-4">
                                    {shortSummary}
                                </p>
                            )}
                        </div>
                    </div>
                </Card>
            </Link>
        </>
     );
}
 
export default Datetoons;