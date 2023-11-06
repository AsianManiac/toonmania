"use client";

import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { routes } from "./header";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import UserMenu from "./user-menu";
import { ModeToggle } from "./mode-toggle";
import { SearchInput } from "./inputs/search";

export const MobileSidebar = () => {
  return (
    <div>
      <div>
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <SideBarItems key={route.id} label={route.title} href={route.url} />
        ))}
      </div>
      <div className="w-auto flex flex-row items-center justify-between">
        <span className="flex justify-center items-center hover:text-green-500">
          <BookOpen size={16} className="mt-1 font-semibold" />
          <Link href={`/toon/create`} className="font-semibold text-base ">
            {" "}
            &nbsp;Creators 101&nbsp;&nbsp;
          </Link>
        </span>
        <ModeToggle />
      </div>
    </div>
  );
};

interface SideBarItemsProps {
  label: string;
  href: string;
}

const SideBarItems = ({ label, href }: SideBarItemsProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === "/" || pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(`/${href}`);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-base font-semibold pl-6 transition-all hover:text-primary hover:bg-slate-300 text-black/60",
        isActive && "text-white bg-slate-300 hover:bg-slate-200/70"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">{label}</div>
    </button>
  );
};
