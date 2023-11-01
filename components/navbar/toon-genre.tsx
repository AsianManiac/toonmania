"use client";
import { ChevronDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

import Container from "@/components/container";
import GenreList from "@/components/navbar/genre-list";
import { Button } from "@/components/ui/button";
import { Genre } from "@prisma/client";

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

  return (
    <>
      <div className="bg-[#fff] dark:bg-[#d3d3da] border-b-[1px] border-gray-300/70">
        <Container className="flex justify-center">
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
        </Container>
      </div>
      {visible && (
        <div className="bg-[#fff] dark:bg-[#d3d3da] border-b-[1px] border-gray-300/70">
          <Container>
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
          </Container>
        </div>
      )}
    </>
  );
};

export default ToonGenre;
