"use client";

import { HeartIcon, PauseIcon } from "lucide-react";
import React, { Fragment } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import makeURLFriendly from "@/helpers/makeurl";
import { useParams } from "next/navigation";

interface Props {
  slug: string;
  title: string;
  image: string | null;
  author: string | null;
  titleNo: string;
  genre: string | undefined;
  likes?: string;
  icons?: string;
}

const MainToon: React.FC<Props> = ({
  slug,
  title,
  image,
  author,
  genre,
  likes,
  titleNo,
  icons = "UP",
}) => {
  return (
    <div className="">
      <Link href={`list/${makeURLFriendly(genre)}/${slug}?title_no=${titleNo}`}>
        <Card
        // onClick={() => router.push(`${genre}/${makeURLFriendly(title)}/list`)}
        >
          <CardContent className="relative p-0 md:h-[200px]">
            {image == null ? (
              <Image
                src={`/webtoon.png`}
                objectFit="cover"
                width={25}
                height={40}
                alt={title}
                className="w-full h-[200px]"
              />
            ) : (
              <Image
                src={`/webtoon/images/${image}`}
                objectFit="cover"
                width="210"
                height="210"
                alt={title}
                className="w-full h-full"
              />
            )}
            <div className="absolute top-[14px] px-4">
              <CardTitle className="lg:text-lg text-base line-clamp-2 font-medium">
                {title}
              </CardTitle>
              <p className="font-semibold text-xs">{author}</p>
              <p className="text-sm flex items-center">
                <span>
                  {" "}
                  <HeartIcon
                    size={"16"}
                    fill="green"
                    className="text-green-700"
                  />
                </span>
                <span className="text-green-700 font-normal"> {likes} </span>
              </p>
              <Fragment>
                {icons === "UP" ? (
                  <Button
                    size={"icon"}
                    className="rounded-full text-[10px] h-7 w-7 text-white/90 bg-green-500"
                  >
                    {icons}
                  </Button>
                ) : icons === "NEW" ? (
                  <Button
                    size={"icon"}
                    className="rounded-full h-7 w-7 text-green-500 text-[10px]"
                  >
                    {icons}
                  </Button>
                ) : icons === "HIATUS" ? (
                  <Button
                    size={"icon"}
                    className="rounded-full text-green-500 bg-black/60 text-[10px] h-7 w-7"
                  >
                    {" "}
                    <PauseIcon />{" "}
                  </Button>
                ) : (
                  <p></p>
                )}
              </Fragment>
              <p className={`text-xs ${makeURLFriendly(genre)}`}>{genre}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default MainToon;

interface ImageProps {
  image: any;
}

export const WebtoonEpisode = ({ image }: ImageProps) => {
  const params = useParams();
  const { name, episodeId } = params;
  return (
    <div className="m-auto flex flex-col justify-center items-center">
      {image?.map((src: React.Key | null | undefined) => (
        <img
          key={src}
          width={"60%"}
          height={"100%"}
          className="md:w-[60vw] w-full px-1"
          src={`/webtoon/originals/${name}/${episodeId}/${src}`}
          alt={`Image `}
          loading="lazy"
        />
      ))}
    </div>
  );
};
