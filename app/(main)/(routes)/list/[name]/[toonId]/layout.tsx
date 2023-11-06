import db from "@/lib/db";
import { redirect } from "next/navigation";
import { Episodes } from "./_components/Episodes";
import Image from "next/image";
import Container from "@/components/container";
import { HiExclamation } from "react-icons/hi";
import { AlertCircle } from "lucide-react";

const MainLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { toonId: string };
}) => {
  const toonAndEpisodes = await db.webtoon.findUnique({
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
      genre: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!toonAndEpisodes) {
    redirect("/genres");
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-[40vh] lg:h-[30vh] xl:h-[35vh]">
        <Container>
          <div className="absolute flex left-[45%] top-[35%] flex-col justify-center items-center z-10">
            <p className={`${toonAndEpisodes.genre?.slug} lg:text-base`}>
              {toonAndEpisodes.genre?.name}
            </p>
            <p className="text-xl text-white font-bold lg:text-3xl">
              {toonAndEpisodes.title}
            </p>
            <span className="flex items-center space-x-2 text-white font-semibold">
              {toonAndEpisodes.authorId}
              <AlertCircle className="h-4 w-4" />
            </span>
          </div>
          <div>
            <Image
              alt="image"
              fill
              src={`/tab/toons/0AsIfLoveDoesntExist_Landingpage_Desktop_Character.png`}
            />
          </div>
          <div className="absolute bg-pink-400 h-[50vh] lg:h-[30vh] z-30">
            <div></div>
          </div>
        </Container>
        <Image
          alt="Cover Image"
          objectFit="fit"
          fill
          src={`/home_bg011.jpg`}
          className="object-fill opacity-0 hidden md:block"
        />
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
