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

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { genres } from "@/data/genre";

interface CategoryProps {
    title: string;
    value: string;
}
 const category: CategoryProps[] = [
    {
        title: "FANTASY",
        value: "fantasy"
    },
    {
        title: "COMEDY",
        value: "comedy"
    },
    {
        title: "DRAMA",
        value: "drama"
    },
    {
        title: "ACTION",
        value: "action"
    },
    {
        title: "SLICE OF LIFE",
        value: "slice-of-life"
    },
    {
        title: "ROMANCE",
        value: "romance"
    },
    {
        title: "SUPERHERO",
        value: "superhero"
    },
    {
        title: "SCI-FI",
        value: "sci-fi"
    },
    {
        title: "THRILLER",
        value: "thriller"
    },
    {
        title: "SUPERNATURAL",
        value: "suppernatural"
    },
    {
        title: "MYSTERY",
        value: "mystery"
    },
    {
        title: "SPORTS",
        value: "sports"
    },
    {
        title: "HISTORICAL",
        value: "historical"
    },
    {
        title: "HEARTWARMING",
        value: "heartwarming"
    },
    {
        title: "HORROR",
        value: "horror"
    },
    {
        title: "INFORMATION",
        value: "information"
    },
 ]

const CategoryTabs = () => {
    const [visible, setVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category

    const changeVisibility = () => {

        if(!visible) {
            setVisible(true)
        }
        if(visible) {
            setVisible(false)
        }
    }
  
    // Filter the data based on the selected category
    const filteredData = category.filter((item) => item.value === selectedCategory);
  
    return (
      <>
        <div className="flex flex-col px-24 items-center">
          <Tabs>
            <TabsList className="bg-white">
              {category.slice(0, 10).map((categoryItem, index) => (
                <div className="grid gap-2" key={index}>
                  <TabsTrigger
                    key={index}
                    value={categoryItem.value}
                    className={cn("data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none text-sm")}
                    onClick={() => setSelectedCategory(categoryItem.value)} // Set selected category
                  >
                    {categoryItem.title}
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
                    {category.slice(8, category.length).map((categoryItem, index) => (
                      <DropdownMenuItem key={index} onClick={() => setSelectedCategory(categoryItem.value)}>
                        {categoryItem.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TabsTrigger>
            </TabsList>
            <TabsContent className="" value={selectedCategory}>
              {/* Display data based on the selected category */}
              {filteredData.map((item, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10 mb-20">
                    
                  {genres.map((genre, index) => ( item.value === selectedCategory  ? (
                    
                    <MainToon
                        image={genre.image}
                        title={genre.title}
                        author={genre.author}
                        likes={genre.likes}
                        icons={genre.icons}
                      />
                    ) : (
                        <p>No Content</p>
                    )
                //   {item.title} - {item.value}
                      
                  ))}
                </div>
              ))}
            </TabsContent>
          </Tabs>
          {visible && (
            <div>
              <Tabs>
                <TabsList className="bg-white">
                  {category.slice(8, category.length).map((categoryItem, index) => (
                    <TabsTrigger
                      key={index}
                      value={categoryItem.value}
                      className={cn("data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none text-sm")}
                      onClick={() => setSelectedCategory(categoryItem.value)}
                    >
                      {categoryItem.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent className="" value={selectedCategory}>
                    {/* Display data based on the selected category */}
                    {filteredData.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            
                        {genres.map((genre, index) => ( item.value === selectedCategory  ? (
                            
                            <MainToon
                                image={genre.image}
                                title={genre.title}
                                author={genre.author}
                                likes={genre.likes}
                                icons={genre.icons}
                            />
                            ) : (
                                <p>No Content</p>
                            )
                        //   {item.title} - {item.value}
                            
                        ))}
                        </div>
                    ))}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </>
    );
  };
export default CategoryTabs;