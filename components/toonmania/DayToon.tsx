import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import makeURLFriendly from "@/helpers/makeurl";
import { Webtoon } from "@/data/comcom";
import { Fragment } from "react";

export default function DayToon({ image, name, author, genre }: Webtoon) {
  return (
    <div>
      <Link href={`list/${makeURLFriendly(genre)}/${makeURLFriendly(name)}`}>
        <Card
        // onClick={() => router.push(`${genre}/${makeURLFriendly(title)}/list`)}
        >
          <CardContent className="relative p-0">
            {image == null ? (
              <Image
                src={`/webtoon.png`}
                objectFit="cover"
                width={25}
                height={40}
                alt={name}
                className="w-full h-[210px]"
              />
            ) : (
              <Image
                src={image}
                objectFit="cover"
                width="210"
                height="210"
                alt={name}
                className="w-full h-auto"
              />
            )}
            <div className="absolute top-0 py-2 h-full px-4 flex flex-col justify-between">
              <Fragment>
                <CardTitle className="text-sm font-medium">{name}</CardTitle>
                <p className="font-semibold text-xs">{author}</p>
              </Fragment>
              <Fragment>
                <p className={`${makeURLFriendly(genre)} text-sm`}>{genre}</p>
              </Fragment>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export function DayOnToon({ image, name, author, genre }: Webtoon) {
  return (
    <div>
      <Link href={`list/${makeURLFriendly(genre)}/${makeURLFriendly(name)}`}>
        <Card
          // onClick={() => router.push(`${genre}/${makeURLFriendly(title)}/list`)}
          className="w-[100%]"
        >
          <CardContent className="relative p-0">
            {image == null ? (
              <Image
                src={`/webtoon.png`}
                objectFit="cover"
                width={25}
                height={40}
                alt={name}
                className="w-full h-[210px]"
              />
            ) : (
              <Image
                src={image}
                objectFit="cover"
                width="210"
                height="210"
                alt={name}
                className="w-full h-auto"
              />
            )}
            <div className="absolute top-0 py-2 h-full px-4 flex flex-col justify-between">
              <Fragment>
                <CardTitle className="text-sm font-medium">{name}</CardTitle>
                <p className="font-semibold text-xs">{author}</p>
              </Fragment>
              <Fragment>
                <p className={`${makeURLFriendly(genre)} text-sm`}>{genre}</p>
              </Fragment>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
