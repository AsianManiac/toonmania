import { HeartIcon, PauseIcon } from "lucide-react";
import Image from "next/image";
import React, { Fragment } from "react";

import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { genres, GenreProps } from "@/data/genre";

const MainToon: React.FC<GenreProps> = (props) => {
    const { image, title, author, likes, icons, category } = props;
  
    return (
      <div className="">
        <Card>
          <CardContent className="relative p-0">
            {image !== null ? (
              <Image
                src={`/webtoon.png`}
                objectFit="cover"
                width={25}
                height={40}
                alt={title}
                className="w-full h-[210px]"
              />
            ) : (
              <Image
                src={image}
                objectFit="cover"
                width="210"
                height="210"
                alt={title}
                className="w-full h-auto"
              />
            )}
            <div className="absolute top-[14px] px-4">
              <CardTitle className="text-lg font-medium">{title}</CardTitle>
              <p className="font-semibold text-sm">{author}</p>
              <p className="text-sm flex items-center">
                <span>
                  {" "}
                  <HeartIcon size={"16"} fill="green" className="text-green-700" />
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
            </div>
          </CardContent>
        </Card>
      </div>
    );
};

export default MainToon;