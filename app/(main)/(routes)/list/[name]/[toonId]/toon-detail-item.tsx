import Container from "@/components/container";
import CoverImage from "@/components/coverImage";
import { Button } from "@/components/ui/button";
import { comcom } from "@/data/comcom";
import { homeDateToon } from "@/data/home-webtoon";
import makeURLFriendly from "@/helpers/makeurl";
import { ChevronRight, EyeIcon, Star, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";

const ToonDetailsItem = () => {
  const toons = comcom;
  return (
    <div className="flex flex-col">
      <div
        style={{
          backgroundImage: `url('/home_bg011.jpg')`,
          backgroundSize: "cover",
        }}
        className="hidden lg:block"
      ></div>
      <div className="z-20">
        <Container>
          <div className="relative h-[50vh] lg:h-[30vh]">
            <p>
              Clososoovsjbvbdsavask vajlkfbvnajb anvajva jvbaofvank jab va
              vlabnfv afjab
            </p>
            <Image
              alt="Cover Image"
              objectFit="fit"
              fill
              src={`/home_bg011.jpg`}
            />
          </div>
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
                    Scan the QR code to download the <em>WEBTOON</em> app on the
                    App Store or Google Play.
                  </p>
                </div>
                {/* Episodes */}
                <ul className="flex flex-col-reverse">
                  {toons.ONGOING.map((category) => (
                    <div key={category.day}>
                      {category.webtoons.slice(0, 1).flatMap((toon) => (
                        <p>
                          <span>{toon.name}</span>
                          {toon.articles!.slice(0, 2).flatMap((article) => (
                            <p>
                              {article.episodes.map((episode) => (
                                <>
                                  <p>{episode.episode}</p>
                                  <p>{episode.episode_number}</p>
                                  <p>{episode.date}</p>
                                  <p>{episode.likes}</p>
                                </>
                              ))}
                            </p>
                          ))}
                        </p>
                      ))}
                    </div>
                  ))}
                  {homeDateToon.slice(35, 45).map((item, index) => (
                    <Link href={`/list/viewer/${item.genre}/Morgana_and_Oz/04`}>
                      <li className="flex flex-1 items-center justify-between border-b-[1px] border-[#f5f5f5] cursor-pointer hover:bg-[#fbfbfb]">
                        <div className="flex flex-row items-center space-x-4">
                          <span>
                            <Image
                              src={item.image}
                              alt={item.title}
                              height={80}
                              width={65}
                            />
                          </span>
                          <span className="text-start">
                            <span>{item.title}</span>
                          </span>
                        </div>

                        <div className="flex flex-row justify-between">
                          <div className="text-start text-sm text-[#c4c4c4] font-normal px-2">
                            <span>{item.author}</span>
                          </div>
                          <div className="text-start text-sm text-[#c4c4c4] font-normal px-2">
                            <span>{item.likes}</span>
                          </div>
                          <div className="text-start text-base  font-normal px-2">
                            <span>#{index}</span>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
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
              <div className="pt-3">
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
                <p className="font-normal text-sm w-[80%] text-justify">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Sequi fugit nisi aperiam eaque, placeat odit odio assumenda
                  deleniti cupiditate nemo delectus atque laudantium nihil
                  exercitationem obcaecati reiciendis, libero soluta, earum ea
                  minus facilis. Nihil corporis illum blanditiis nesciunt nobis
                  beatae.
                </p>
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="rounded-3xl mt-5 w-[80%]"
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
          <div className="flex flex-row mt-16 mb-20">
            {homeDateToon.slice(13, 16).map((item, index) => (
              <li className="flex flex-1 items-center justify-between  cursor-pointer bg-white">
                <Link
                  href={`/list/${makeURLFriendly(item.genre)}/${makeURLFriendly(
                    item.title
                  )}`}
                >
                  <div className="flex flex-row items-center space-x-4">
                    <span>
                      <Image
                        src={item.image}
                        alt={item.title}
                        objectFit="cover"
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
  );
};

export default ToonDetailsItem;