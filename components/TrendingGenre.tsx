import { homeDateToon } from "@/data/home-webtoon";

import TrendingHeader from "@/components/trending-genre-header";
import TrendingGenreItem from "@/components/trending-genre-item";
import CanvasSpot from "@/components/canvas/canvas-spot";

const TrendingGenre = () => {
    return ( 
        <>
            <div className="w-full bg-white dark:bg-[#212122] border-b-[1px] border-gray-300/70 pb-16">
                <div className="flex lg:flex-row space-x-16 flex-col items-center m-auto justify-center w-[1000px]">
                    <div className="w-[50%] ">
                        <TrendingHeader
                            title={"New & Trending"}
                            border={"border-b-[1px] border-gray-300/70"}
                            className="text-xl text-left"
                        />
                        {homeDateToon.slice(59, 63).map((data, index) => (
                            <TrendingGenreItem
                                key={index}
                                title={data.title}
                                author={data.author}
                                genre={data.genre}
                                image={data.image}
                            />
                        ))}
                    </div>
                    <div className="w-[50%]">
                        <TrendingHeader
                            title={"ORIGINALS by Genre"}
                            border={"border-b-[1px] border-gray-300/70"}
                            className="text-xl"
                        />
                        {homeDateToon.slice(43, 47).map((data, index) => (
                            <TrendingGenreItem
                                key={index}
                                title={data.title}
                                author={data.author}
                                genre={data.genre}
                                image={data.image}
                            />
                        ))}
                    </div>
                </div>
                
            </div>
            <div className="w-full bg-white dark:bg-[#212122] ">
                <CanvasSpot/>
            </div>
        </>
            
     );
}
 
export default TrendingGenre;