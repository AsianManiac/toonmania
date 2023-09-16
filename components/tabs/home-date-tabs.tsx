"use client"

import { useState } from "react";

import { 
    Tabs,
    TabsList,
    TabsContent,
    TabsTrigger
 } from "@/components/ui/tabs";

 import { cn } from "@/lib/utils";
import Link from "next/link";
import Datetoons from "@/components/toonmania/date-toons";
import { homeDateToon } from "@/data/home-webtoon";

const days = [
    {
        day: "MONDAY",
    },
    {
        day: "TUEDAY",
    },
    {
        day: "WEDNESDAY",
    },
    {
        day: "THURSDAY",
    },
    {
        day: "FRIDAY",
    },
    {
        day: "SARTURDAY",
    },
    {
        day: "SUNDAY",
    },
]

const HomeDateTabs = () => {
    const [selectedDay, setSelectedDay] = useState(""); 
    return ( 
        <div>
            <div className=" border-b-[1px] border-gray-300/70 pb-9">
            <Tabs className="">
                <TabsList className="bg-white w-full h-auto flex items-center justify-center">
                {days.slice(0, 10).map((day, index) => (
                    <div className="grid gap-2" key={index}>
                    <TabsTrigger
                        key={index}
                        value={day.day}
                        className={cn("data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none text-sm")}
                        onClick={() => setSelectedDay(day.day)} 
                    >
                        {day.day}
                    </TabsTrigger>
                    </div>
                ))}
                <Link href={`/originals`} className="text-sm font-base text-gray-400/60">MORE</Link>
                </TabsList>

                <TabsContent 
                    className="w-full h-auto flex items-center justify-center" 
                    value={selectedDay}
                >
                    {/* Render Items Here By Date */}
                    <div className="grid grid-cols-5 gap-2">

                    {homeDateToon.slice(0,10).map((toons, index) => (
                        <Datetoons
                            key={index}
                            image={toons.image}
                            title={toons.title}
                            author={toons.author}
                            likes={toons.likes}
                            genre={toons.genre}
                            // longSummary={toons.longSummary}
                            // shortSummary={toons.shortSummary}
                        />
                    ))}
                    </div>
                </TabsContent>
            </Tabs>
            </div>
        </div>
     );
}
 
export default HomeDateTabs;
