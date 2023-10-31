import CategoryTabs from "@/components/category-tabs";
import Container from "@/components/container";
import DayToon from "@/components/toonmania/DayToon";
import { Webtoon, comcom } from "@/data/comcom";
import { Check } from "lucide-react";


import React from 'react';

interface WebtoonInfoProps {
  webtoon: Webtoon;
}

const WebtoonInfo: React.FC<WebtoonInfoProps> = ({ webtoon }) => (

    <div className="m-auto bg-slate-300 cursor-pointer">
      <ul className="flex flex-col">
        <DayToon
            key={webtoon.name}
            name={webtoon.name}
            genre={webtoon.genre}
            image={webtoon.image}
        />
        
      </ul>
    </div>
);

const GenresPage = () => {
    return ( 
        <div className="">
            <div className=" bg-white shadow-sm">
                <div className="flex flex-row items-center justify-center space-x-2">
                    <p className="font-medium text-lg cursor-pointer py-3 hover:text-slate-900 text-slate-800/50 hover:underline">ONGOING</p>
                    <p className="font-medium text-lg cursor-pointer py-3 hover:text-slate-900 text-slate-800/50 hover:underline">COMPLETED</p>
                </div>
            </div>
            <div className="mb-6">
                <Container>
                    {/* Ongoing Section */}
                    <div className="flex pt-5 justify-between flex-row items-center">
                        <h2 className="font-semibold text-xl">Ongoing Series</h2>
                        <span className="flex items-center gap-x-2">Order by <span><Check className="h-5 w-5" /></span></span>
                    </div> 
                    <div className="grid py-5 grid-cols-7 gap-x-1">
                        {comcom.ONGOING.map((category) => (
                        <div key={category.day}>
                            <h2 className="font-bold text-xl text-black hover:text-green-500 text-center cursor-pointer h-6">{category.day.slice(0,3)}</h2>
                            {category.webtoons.slice(0, 15).flatMap((webtoon) => (
                            <WebtoonInfo key={webtoon.name} webtoon={webtoon} />
                            ))}
                        </div>
                        ))}
                        <div className="group">
                            <div className="m-auto bg-slate-300 group-hover:scale-x-110 cursor-pointer">

                                <h2 className="font-bold text-xl text-black hover:text-green-500 cursor-pointer h-6">MONDAY</h2>
                                <ul className="flex flex-col">
                                    <p className="h-10 text-center pt-1">className</p>
                                    <p className="h-10 text-center pt-1">className</p>
                                    <p className="h-10 text-center pt-1">className</p>
                                    <p className="h-10 text-center pt-1">className</p>
                                    <p className="h-10 text-center pt-1">className</p>
                                    <p className="h-10 text-center pt-1">className</p>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Completed Section */}
                    <div className="flex pt-5 justify-between flex-row items-center">
                        <h2>Ongoing Series</h2>
                        <span className="flex items-center gap-x-2">Order by <span><Check className="h-5 w-5" /></span></span>
                    </div> 
                    <div className="grid py-5 grid-cols-7 gap-x-2">
                    {/* {data.COMPLETED.map((category, index) => (
                        <div key={index}>
                            {category.webtoons.map((webtoon) => (
                            <WebtoonInfo key={webtoon.name} webtoon={webtoon} />
                            ))}
                        </div>
                        ))} */}
                    </div>
                </Container>
            </div>
            <div className="h-auto p-2 w-full z-10 sticky">
                <CategoryTabs/>
            </div>
        
        </div>
     );
}
 
export default GenresPage;