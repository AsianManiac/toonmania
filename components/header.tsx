"use client";

import { BookOpen, Menu, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { User } from "@prisma/client";
import UserMenu from "./user-menu";
import { SearchInput } from "./inputs/search";
import { MobileSidebar } from "./moibile-sidebar";

interface HeaderProps {
  currentUser?: User | null;
}

export const routes = [
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
  },
  {
    id: 5,
    title: "DAYS",
    url: "days",
  },
];

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  // console.log({currentUser})
  const [search, setSearch] = useState("");
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const searching = () => {
    return (
      <div>
        <input
          type="search"
          placeholder="search something"
          className="rounded-xl outline-none border-none text-gray-500"
        />
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-row h-[70px] border-b-[1px] border-gray-300/70 justify-between items-center px-7 bg-white dark:bg-[#212122] z-20">
        <div className="w-auto flex flex-row items-center justify-between">
          <div className="pr-2">
            <Logo className="hidden" />
          </div>
          {/* header items */}
          <div className="hidden lg:block">
            {routes.map((title, index) => (
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
          <Button
            onClick={() => {}}
            className="md:block lg:hidden"
            variant={"ghost"}
          >
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="h-8 w-8" />
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader></SheetHeader>
                <MobileSidebar />
              </SheetContent>
            </Sheet>
          </Button>
          <SearchInput />
        </div>
        <div className="w-auto md:flex hidden md:flex-row items-center justify-between">
          <span className="flex justify-center items-center hover:text-green-500">
            <BookOpen size={16} className="mt-1 font-semibold" />
            <Link href={`/toon/create`} className="font-semibold text-base ">
              {" "}
              &nbsp;Creators 101&nbsp;&nbsp;
            </Link>
          </span>
          <UserMenu currentUser={currentUser} />
          <ModeToggle />
          <SearchInput />
        </div>
      </div>
    </div>
  );
};

export default Header;
