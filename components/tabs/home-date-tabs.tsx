"use client";

import { useState } from "react";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Datetoons from "@/components/toonmania/date-toons";
import { homeDateToon } from "@/data/home-webtoon";
import Container from "../container";

const days = [
  {
    day: "MONDAY",
  },
  {
    day: "TUESDAY",
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
    day: "SATURDAY",
  },
  {
    day: "SUNDAY",
  },
];

const HomeDateTabs = () => {
  const [selectedDay, setSelectedDay] = useState("");
  return (
    <Container>
      <div className=" border-b-[1px] border-gray-300/70 pb-9">
        <Tabs className="">
          <TabsList className="bg-white w-full h-auto flex items-center justify-center p-0">
            {days.map((day, index) => (
              <div className="grid gap-2" key={index}>
                <TabsTrigger
                  key={index}
                  value={day.day}
                  className={cn(
                    "data-[state=active]:text-white py-3 lg:w-[120px] w-auto md:w-[110px] data-[state=active]:bg-[#00dc64] hover:text-[#00dc64] data-[state=active]:rounded-none text-xl text-black font-medium"
                  )}
                  onClick={() => setSelectedDay(day.day)}
                >
                  {day.day.slice(0, 3)}
                </TabsTrigger>
              </div>
            ))}
          </TabsList>

          <TabsContent
            className="w-full h-auto flex items-center justify-center"
            value={selectedDay}
          >
            {/* Render Items Here By Date */}
            <div
              className="grid lg:grid-cols-5 md:grid-cols-4
            grid-cols-3 gap-2"
            >
              {homeDateToon.slice(0, 10).map((toons, index) => (
                <Datetoons
                  key={index}
                  image={toons.image}
                  title={toons.title}
                  author={toons.author}
                  likes={toons.likes}
                  genre={toons.genre}
                  longSummary={toons.longSummary}
                  shortSummary={toons.shortSummary}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default HomeDateTabs;
