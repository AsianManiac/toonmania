import Image from "next/image";

import { HomeToonsProps, homeDateToon } from "@/data/home-webtoon";
import Datetoons, { GenreHead } from "./date-toons";

import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import TrendingHeader from "../trending-genre-header";

const HomeGenre = () => {
    const makeURLFriendly = (str: any) => {
        return str.toLowerCase().replace(/\s+/g, "-");
      };
    return ( 
        <div className="w-full">
            <Link href={`genres`}>
                <TrendingHeader
                    title={"GENRES"}
                    className={"font-semibold text-xl text-center"}
                />
            </Link>
            <div className="flex justify-center flex-row space-x-2 items-center">
                <GenreHead
                    genre={"Superhero"}
                    text={"Witches, werewolves and cryptids. Oh my!"}
                />
                {homeDateToon.slice(34, 38).map((toons, index) => (
                    <Datetoons
                        key={index}
                        image={toons.image}
                        title={toons.title}
                        genre={toons.genre}
                        author={toons.author}
                        likes={toons.likes}
                        longSummary={toons.longSummary}
                        shortSummary={toons.shortSummary}
                    />
                ))}
            </div>
            <div className="flex justify-center flex-row space-x-2 items-center pt-2 pb-4">
                <GenreHead
                    genre={"Comedy"}
                    text={"Good Laughter is all we need."}
                />
                {homeDateToon.slice(20, 24).map((toons, index) => (
                    <Datetoons
                        key={index}
                        image={toons.image}
                        title={toons.title}
                        genre={toons.genre}
                        author={toons.author}
                        likes={toons.likes}
                        longSummary={toons.longSummary}
                        shortSummary={toons.shortSummary}
                    />
                ))}
            </div>
        </div>
     );
}
 
export default HomeGenre;