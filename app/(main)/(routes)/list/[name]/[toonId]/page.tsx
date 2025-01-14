import ClientOnly from "@/components/client";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import { homeDateToon } from "@/data/home-webtoon";
import ToonDetailsItem from "./toon-detail-item";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { Episodes } from "./_components/Episodes";
import Image from "next/image";
import makeURLFriendly from "@/helpers/makeurl";
import { ChevronRight, EyeIcon, Star, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Preview } from "@/components/preview";

interface IParams {
  name: string;
  toonId: string;
}

const ToonDetails = async ({ params }: { params: IParams }) => {
  const toonAndEpisodes = await db.webtoon.findFirst({
    where: {
      slug: params.toonId,
    },
    include: {
      episodes: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "desc",
        },
      },
    },
  });

  if (!toonAndEpisodes) {
    redirect("/genres");
  }

  const toon = await homeDateToon;
  if (!toon) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <div className="flex flex-col">
        <div className="z-20">
          <Container>
            <div className="flex flex-col md:flex-row">
              {/* Episode Area */}
              <div className="bg-white dark:bg-[#212122] w-full md:w-[66%] pt-7 px-5 pb-20">
                <div className="flex flex-col">
                  {/* head area */}
                  <div className="border-y-[1px] border-[#f5f5f5] py-6 text-center">
                    <strong>
                      Read <em>5</em> more new episodes on the app!
                    </strong>
                    <br />
                    <p>
                      Scan the QR code to download the <em>WEBTOON</em> app on
                      the App Store or Google Play.
                    </p>
                  </div>
                  {/* Episodes */}
                  <Episodes toon={toonAndEpisodes} />
                </div>
              </div>
              {/* Details Area */}
              <div
                className="bg-white dark:bg-[#212122] w-full md:w-[34%] pt-9 pl-8"
                style={{
                  backgroundImage: `url('/tab/toons/0LikeWindonaDryBranch_desktop_thumbnail (1).jpg')`,
                  backgroundSize: "cover",
                }}
              >
                <div className="py-3">
                  <ul className="flex flex-row space-x-2 pb-4">
                    <li className="flex flex-row items-center">
                      <span className="font-normal text-sm">
                        <EyeIcon size={18} color="#00dc64" />
                      </span>
                      <span>1.1B</span>
                    </li>
                    <li className="flex flex-row items-center">
                      <span className="font-normal text-sm">
                        <UserCheck size={18} color="#00dc64" />
                      </span>
                      <span>3.4M</span>
                    </li>
                    <li className="flex flex-row items-center">
                      <span className="font-normal text-sm">
                        <Star size={18} color="#00dc64" />
                      </span>
                      <span>9.86</span>
                    </li>
                    <li className="flex flex-row items-center justify-center">
                      <button className="bg-[#00dc64] font-medium text-white rounded-xl pb-1 text-sm text-center px-3">
                        Rate
                      </button>
                    </li>
                  </ul>
                  <div className="pb-3">
                    <Button
                      size={"icon"}
                      className="rounded-full text-[10px] h-7 w-7 text-white/90 bg-green-500"
                    >
                      UP
                    </Button>
                    <span className="font-semibold pl-3">EVERY MONDAY</span>
                  </div>
                  <p className="font-normal text-sm w-[90%] text-justify">
                    <Preview value={toonAndEpisodes.description!} />
                  </p>
                  <Button
                    variant={"default"}
                    size={"lg"}
                    className="rounded-3xl md:text-base text-lg mt-5 w-[80%]"
                  >
                    First Episode &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-end">
                      {" "}
                      <ChevronRight size={16} className="text-end" />{" "}
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Realted toons */}
            <div className="md:flex hidden md:flex-row mt-16 mb-20">
              {homeDateToon.slice(13, 16).map((item, index) => (
                <li
                  key={index}
                  className="flex flex-1 items-center justify-between  cursor-pointer bg-white"
                >
                  <Link
                    href={`/list/${makeURLFriendly("drama")}/${makeURLFriendly(
                      item.title
                    )}`}
                  >
                    <div className="flex flex-row items-center space-x-4">
                      <span>
                        <Image
                          src={item.image}
                          alt={item.title}
                          height={100}
                          width={100}
                          loading={"lazy"}
                          className="border-[1px] border-gray-200/80"
                        />
                      </span>
                      <span className="text-start">
                        <p className="font-medium text-base">{item.title}</p>
                        <p className="font-normal text-xs">{item.author}</p>
                        <p className="font-semibold text-sm text-[#00dc64]">
                          {item.likes}
                        </p>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </ClientOnly>
  );
};

export default ToonDetails;
