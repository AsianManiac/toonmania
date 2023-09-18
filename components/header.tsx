"use client"

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import UserMenu from "./user-menu";

interface HeaderProps{
    currentUser?: User | null;
}

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

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
    // console.log({currentUser})
    const [search, setSearch] = useState("")
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const searching = () => {
        return (
            <div>
                <input type="search" placeholder="search something" className="rounded-xl outline-none border-none text-gray-500" />
            </div>
        )
    }

    return ( 
        <div className="w-full">
            <div className="flex flex-row h-[70px] border-b-[1px] border-gray-300/70 justify-between items-center px-7 bg-white dark:bg-[#212122] z-20">
                <div className="w-auto flex flex-row items-center justify-between">
                    <div className="pr-2">
                        <Logo/>
                    </div>
                    {/* header items */}
                    <div>
                    {header.map((title, index) => (
                        <Fragment key={title.id}>
                        <Link 
                            href={`/${title.url}`}
                            key={index}
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
                    <UserMenu currentUser={currentUser}/>
                    <ModeToggle/>
                    <Button size={"icon"} className="mx-1 h-6 w-6 rounded-full bg-transparent border-gray-300 border-2 dark:border-none text-gray-400 hover:bg-gray-100/60">
                        <SearchIcon size={15}/>
                    </Button>
                </div>
            </div>
        </div>
     );
}
 
export default Header;