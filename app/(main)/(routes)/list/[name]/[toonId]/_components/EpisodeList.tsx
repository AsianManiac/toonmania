"use client";

import { toonEpisode } from "@/helpers/makeurl";
import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle, Unlock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface EpisodeListProps {
  id: string;
  label: string;
  name: string;
  author: string | null;
  episodeNo: string;
  episodeUrl: string;
  episodeImage: string;
  likes?: number;
  toonId: string;
  isFree: boolean;
}

export const EpisodeList = ({
  id,
  label,
  name,
  author,
  episodeNo,
  episodeUrl,
  episodeImage,
  likes = 12.3,
  toonId,
  isFree,
}: EpisodeListProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isFree ? Lock : CheckCircle;

  return (
    <Link
      href={`/list/viewer/${name}/${episodeUrl}`}
      className="flex flex-1 items-center justify-between border-b-[1px] border-[#f5f5f5] cursor-pointer hover:bg-[#fbfbfb]"
    >
      <div className="flex flex-row items-center space-x-4">
        <span>
          <Image
            src={`/webtoon/images/${episodeImage}`}
            alt={label}
            className="object-cover h-[80px] w-[65px]"
            height={80}
            width={65}
          />
        </span>
        <span className="text-start">
          <Icon
            size={15}
            className={cn("", !isFree ? "text-primary" : "text-foreground")}
          />
          <span>{label}</span>
        </span>
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-start text-sm text-[#c4c4c4] font-normal px-2">
          <span>{author}</span>
        </div>
        <div className="text-start text-sm text-[#c4c4c4] font-normal px-2">
          <span>{likes}</span>
        </div>
        <div className="text-start text-base  font-normal px-2">
          {!isFree ? (
            <span className="text-primary">#{episodeNo}</span>
          ) : (
            <Unlock className="h-4 w-4 text-foreground" />
          )}
        </div>
      </div>
    </Link>
  );
};
