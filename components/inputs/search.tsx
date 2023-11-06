"use client";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SearchInput = () => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentGenre = searchParams?.get("genre");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          genre: currentGenre,
          title: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [debouncedValue, currentGenre, router, pathname]);

  const toggleEdit = () => setIsSearching((current) => !current);
  return (
    <div className="z-20 md:hidden">
      {!isSearching && (
        <Button
          onClick={toggleEdit}
          variant={"ghost"}
          size={"icon"}
          className="mx-1 h-6 w-6 rounded-full bg-transparent border-gray-200 border-[1px] dark:border-none text-slate-700 hover:bg-gray-100/60 cursor-pointer sticky"
        >
          <SearchIcon className="h-4 w-5" />
        </Button>
      )}
      {isSearching && (
        <div className="relative">
          <SearchIcon
            onClick={toggleEdit}
            className="h-5 w-5 absolute top-3 left-3 cursor-pointer"
          />
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full md:w-[300px] pl-9 rounded-full focus-visible:ring-slate-500/70"
            placeholder="Seacrh a toon..."
          />
        </div>
      )}
    </div>
  );
};
