import Image from "next/image";
import React from "react";
import Link from "next/link";

import { 
    Card, 
    CardContent, 
    CardTitle 
} from "@/components/ui/card"

import { HomeToonsProps } from "@/data/home-webtoon";
import makeURLFriendly from "@/helpers/makeurl";

const CanvasSpotItem: React.FC<HomeToonsProps> = ({ ...props }) => {
      const { image, title, author, genre } = props
    return ( 
        <>
            <Link href={`${makeURLFriendly(title)}`}>
                <Card className="lg:w-40 w-36 rounded-none group opacity-100 group-hover:opacity-0 transition-opacity duration-200 relative cursor-pointer">
                    <CardContent className="relative p-0">
                        <Image
                            src={image}
                            width={100}
                            height={100}
                            alt={title + genre}
                            className="w-full"
                        />
                        <div className="absolute bottom-4 px-4 text-white">
                            <CardTitle className="font-semibold text-sm lg:text-base line-clamp-1">{title}</CardTitle>
                            <p className={`text-xs font-medium `}>{author}</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </>
     );
}
 
export default CanvasSpotItem;