"use client";
import { Check, ChevronDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

import Container from "@/components/container";
import GenreList from "@/components/navbar/genre-list";
import { Button } from "@/components/ui/button";
import { Genre } from "@prisma/client";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface ToonGenreProps {
  items: Genre[];
}

const ToonGenre = ({ items }: ToonGenreProps) => {
  const [visible, setVisible] = useState(false);
  const params = useSearchParams();
  const genre = params?.get("genre");
  const pathname = usePathname();

  const changeVisibility = () => {
    if (!visible) {
      setVisible(true);
    }
    if (visible) {
      setVisible(false);
    }
  };

  const isMainpage = pathname === "/genres";

  if (!isMainpage) {
    return null;
  }

  const genreParam = params?.get("genre");

  const defaultGenre = "";
  // Filter the data based on the 'genre' query parameter
  const filteredToons = genreParam
    ? items?.filter((item) => item.slug === genreParam)
    : items?.filter((item) => item.slug === defaultGenre);

  return (
    <>
      <div className="bg-[#fff] dark:bg-[#d3d3da] border-b-[1px] border-gray-300/70">
        <Container className="flex justify-center">
          <ScrollArea>
            <div className="pt-4 flex flex-row items-center overflow-x-auto scrollbar-hide">
              {items.slice(0, 10).map((item) => (
                <GenreList
                  key={item.id}
                  label={item.name}
                  selected={genre === item.slug}
                  value={item.slug}
                />
              ))}
              <Button
                className="flex flex-row items-center hover:bg-transparent hover:text-neutral-800 text-neutral-500"
                variant="ghost"
                size="sm"
                onClick={changeVisibility}
              >
                <p className="font-medium text-sm">OTHERS</p>
                <ChevronDown color="black" size={15} />
              </Button>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Container>
      </div>
      {visible && (
        <div className="bg-[#fff] dark:bg-[#d3d3da] border-b-[1px] border-gray-300/70">
          <Container>
            <ScrollArea>
              <div className="pt-[10px] px-5 flex flex-row items-center justify-center overflow-x-auto">
                {items.slice(10, items.length).map((item) => (
                  <GenreList
                    key={item.id}
                    label={item.name}
                    selected={genre === item.slug}
                    value={item.slug}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </Container>
        </div>
      )}
      <Container>
        <div className="flex pt-5 justify-between py-2 mt-10 flex-row items-center">
          {filteredToons?.map((item, index) => (
            <h2
              key={index}
              className={`font-semibold ${item.slug} text-base flex items-center`}
            >
              {item.name}
            </h2>
          ))}
          <span className="flex items-center gap-x-2">
            Order by{" "}
            <span>
              <Check className="h-5 w-5" />
            </span>
          </span>
        </div>
      </Container>
    </>
  );
};

export default ToonGenre;
