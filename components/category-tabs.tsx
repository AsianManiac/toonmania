"use client"
import { useState } from "react";

import { 
    Tabs,
    TabsList,
    TabsContent,
    TabsTrigger
 } from "@/components/ui/tabs";

 import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import MainToon from "@/components/toonmania/main-toon";

import { ChevronDown, HeartPulse, MoonStar } from "lucide-react";
import { cn } from "@/lib/utils";
import { genres } from "@/data/genre";
import { homeDateToon } from "@/data/home-webtoon";
import { HiBookOpen, HiOutlineEmojiHappy, HiOutlineHeart, HiOutlineLibrary, HiOutlineSparkles, HiOutlineSun, HiOutlineSupport, HiSparkles, HiTrendingDown } from "react-icons/hi";
import { BiKnife, BiNews, BiPlanet } from "react-icons/bi";
import { AiOutlineGroup } from "react-icons/ai";
import { IconType } from "react-icons";

interface CategoryProps {
    label: string;
    value: string;
    icon: IconType;
}
 export const categories: CategoryProps[] = [
    {
        label: "FANTASY",
        value: "fantasy",
        icon: HiOutlineSparkles
    },
    {
        label: "COMEDY",
        value: "comedy",
        icon: HiOutlineEmojiHappy
    },
    {
        label: "DRAMA",
        value: "drama",
        icon: HiOutlineHeart
    },
    {
        label: "ACTION",
        value: "action",
        icon:  HiTrendingDown
    },
    {
        label: "SLICE OF LIFE",
        value: "slice-of-life",
        icon: HiOutlineSun
    },
    {
        label: "ROMANCE",
        value: "romance",
        icon: HeartPulse
    },
    {
        label: "SUPERHERO",
        value: "superhero",
        icon: MoonStar
    },
    {
        label: "SCI-FI",
        value: "sci-fi",
        icon: BiPlanet
    },
    {
        label: "THRILLER",
        value: "thriller",
        icon: BiKnife
    },
    {
        label: "SUPERNATURAL",
        value: "suppernatural",
        icon: HiSparkles
    },
    {
        label: "MYSTERY",
        value: "mystery",
        icon: BiNews
    },
    {
        label: "SPORTS",
        value: "sports",
        icon: HiOutlineSupport
    },
    {
        label: "HISTORICAL",
        value: "historical",
        icon: HiOutlineLibrary
    },
    {
        label: "HEARTWARMING",
        value: "heartwarming",
        icon: HiOutlineEmojiHappy
    },
    {
        label: "HORROR",
        value: "horror",
        icon: AiOutlineGroup
    },
    {
        label: "INFORMATION",
        value: "information",
        icon: HiBookOpen
    },
 ]

const CategoryTabs = () => {
    const [visible, setVisible] = useState(false);

    const changeVisibility = () => {

        if(!visible) {
            setVisible(true)
        }
        if(visible) {
            setVisible(false)
        }
    }
  
    return (
      <>
        <div className="flex flex-col px-24 items-center">
          <Tabs>
            <TabsList className="bg-white">
              {categories.slice(0, 10).map((categoryItem, index) => (
                <div className="grid gap-2" key={index}>
                  <TabsTrigger
                    key={index}
                    value={categoryItem.value}
                    className={cn("data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none text-sm")}
                  >
                    {categoryItem.label}
                  </TabsTrigger>
                </div>
              ))}
              <TabsTrigger className={cn("data-[state=active]:text-black dark:data-[state=active]:text-gray-400 data-[state=active]:shadow-none data-[state=active]:rounded-none text-sm p-0")} value="" onClick={changeVisibility}>
                OTHERS
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-inherit border-0 hover:outline-none hover:border-transparent" variant="outline" size="icon">
                      <ChevronDown className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {categories.slice(8, categories.length).map((categoryItem, index) => (
                      <DropdownMenuItem key={index}>
                        {categoryItem.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TabsTrigger>
            </TabsList>
            <TabsContent className="" value={"Drama"}>
              {/* Display data based on the selected category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10 mb-20">
                    
                  {homeDateToon.map((genre, index) => (
                    
                    <MainToon
                      key={index}
                      image={genre.image}
                      title={genre.title}
                      author={genre.author}
                      likes={genre.likes}
                      icons={genre.icons}
                    />
                //   {item.label} - {item.value}
                      
                  ))}
                </div>
            </TabsContent>
          </Tabs>
          {visible && (
            <div>
              <Tabs>
                <TabsList className="bg-white">
                  {categories.slice(8, categories.length).map((categoryItem, index) => (
                    <TabsTrigger
                      key={index}
                      value={categoryItem.value}
                      className={cn("data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none text-sm")}
                      
                    >
                      {categoryItem.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent className="" value={"Drama"}>
              {/* Display data based on the selected category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10 mb-20">
                    
                  {homeDateToon.map((genre, index) => (
                    
                    <MainToon
                      key={index}
                      image={genre.image}
                      title={genre.title}
                      author={genre.author}
                      likes={genre.likes}
                      icons={genre.icons}
                    />
                //   {item.label} - {item.value}
                      
                  ))}
                </div>
            </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </>
    );
  };
export default CategoryTabs;