import Image from "next/image";
import { HeartIcon } from "lucide-react";

import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"

import { HomeToonsProps, homeDateToon } from "@/data/home-webtoon";
import React from "react";

const Datetoons: React.FC<HomeToonsProps> = ({ ...props }) => {
    const makeURLFriendly = (str: any) => {
        return str.toLowerCase().replace(/\s+/g, "-");
      };
      const { image, title, author, likes, genre, shortSummary, longSummary } = props
    return ( 
        <>
            <Card className="w-48 rounded-none group opacity-100 group-hover:opacity-0 transition-opacity duration-200 relative">
                <CardContent className="relative p-0">
                    <Image
                        src={image}
                        width={100}
                        height={100}
                        alt={title}
                        className="w-full"
                    />
                    <div className="absolute top-[14px] px-4">
                        <CardTitle className="font-medium text-[15px] pb-1">{title}</CardTitle>
                        <p className="text-sm flex items-center">
                            <span>
                            <HeartIcon size={"16"} fill="#00dc64" className="text-[#00dc64]" />
                            </span>
                            <span className="text-[#00dc64] font-medium text-xs"> {likes} </span>
                        </p>
                    </div>
                    <div className="absolute bottom-5 px-4">
                        <p className={`text-xs font-medium ${makeURLFriendly(genre)}`}>{genre}</p>
                    </div>
                </CardContent>
                <div className={`absolute top-0 left-0 w-full h-full bg-${makeURLFriendly(genre)} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                Hovered over
                </div>
            </Card>
        </>
     );
}
 
export default Datetoons;