"use client"

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

import { cn } from "@/lib/utils";

const header = [
    {
        id: 1,
        title: "ORIGINALS",
        url: "originals",
    },
    {
        id: 2,
        title: "GENRES",
        url: "genres",
    },
    {
        id: 3,
        title: "POPULAR",
        url: "popular",
    },
    {
        id: 4,
        title: "CANVAS",
        url: "canvas",
    }

]

const Header = () => {
    const [search, setSearch] = useState("")
    const searching = () => {
        return (
            <div>
                <input type="search" placeholder="search something" className="rounded-xl outline-none border-none text-gray-500" />
            </div>
        )
    }

    return ( 
        <div className="flex flex-row h-[70px] justify-between items-center px-7 bg-white dark:bg-[#212122] z-20">
            <div className="w-auto flex flex-row items-center justify-between">
                <div className="pr-2">
                    <Image
                        src="/webtoon-logo.png"
                        alt="Vercel Logo"
                        className=""
                        width={50}
                        height={18}
                        priority
                    />
                </div>
                {/* header items */}
                <div>
                {header.map((title) => (
                    <Fragment key={title.id}>
                    <Link 
                        href={`${title.url}`}
                        className="px-3 font-medium text-sm hover:text-green-400"
                    >
                        {title.title}
                    </Link>
                    </Fragment>
                ))}
                </div>
            </div>
            <div className="w-auto flex flex-row items-center justify-between">
                <span className="flex justify-center items-center hover:text-green-500">
                    <BookOpen size={16} className="mt-1 font-semibold"/>
                    <Link href={`/`} className="font-semibold text-base "> &nbsp;Creators 101&nbsp;&nbsp;</Link>
                </span>
                <Button onClick={() => {}} variant={"default"} className={cn("mx-1 px-10 h-7 w-10 bg-black/80 text-xs font-semibold hover:bg-black dark:bg-green-400 hover:dark:bg-green-500 text-white rounded-3xl")}>
                    Publish
                </Button>
                <Button onClick={() => {}} variant={"outline"} className={cn("mx-1 px-10 h-7 w-10 text-xs font-semibold text-[#838383] rounded-3xl")}>
                    Login
                </Button>
                <ModeToggle/>
                <Button size={"icon"} className="mx-1 h-6 w-6 rounded-full bg-transparent border-gray-300 border-2 dark:border-none text-gray-400 hover:bg-gray-100/60">
                    <SearchIcon size={15}/>
                </Button>
            </div>
        </div>
     );
}
 
export default Header;