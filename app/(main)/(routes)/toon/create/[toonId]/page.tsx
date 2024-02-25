import getCurrentUser from "@/actions/getCurrentUser";
import { Icon } from "@/components/icon";
import db from "@/lib/db";
import {
  CircleDollarSign,
  LayoutDashboard,
  ListChecks,
  Music,
  Pause,
} from "lucide-react";
import { redirect } from "next/navigation";
import { AttachmentForm } from "./_components/AttachmentForm";
import { GenreForm } from "./_components/CategoryForm";
import { EpisodeForm } from "./_components/ChapterForm";
import { DailyPassForm } from "./_components/DailyPassForm";
import { DescriptionForm } from "./_components/DescriptionForm";
import { ImageUploadForm } from "./_components/ImageUpload";
import { TitleForm } from "./_components/TitleForm";
import { BulkEpisodeForm } from "./_components/BulkEpisodeForm";
import { HiFolderOpen } from "react-icons/hi";
import Banner from "@/components/banner";
import { ToonState } from "./_components/ToonState";

const ToonId = async ({ params }: { params: { toonId: string } }) => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  if (!userId) {
    return redirect("/");
  }

  const toon = await db.webtoon.findUnique({
    where: {
      id: params.toonId,
      userId,
    },
    include: {
      episodes: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const genres = await db.genre.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!toon) {
    redirect("/");
  }

  const requiredFields = [
    toon.title,
    toon.authorId,
    toon.description,
    toon.coverImage,
    toon.genreId,
    toon.episodes.some((episode) => episode.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!toon.isPublished && (
        <Banner
          variant={"warning"}
          lable="This toon has not been made public, it won't be visible to users!"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Toon Data</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <ToonState
            disabled={!isCompleted}
            toonId={params.toonId}
            isPublished={toon.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <Icon icon={LayoutDashboard} />
              <h2 className="text-xl">Setup your toon</h2>
            </div>
            <TitleForm initialData={toon} toonId={toon.id} />
            <DescriptionForm initialData={toon} toonId={toon.id} />
            <ImageUploadForm initialData={toon} toonId={toon.id} />
            <GenreForm
              initialData={toon}
              toonId={toon.id}
              options={genres.map((genre) => ({
                label: genre.name,
                value: genre.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <Icon icon={ListChecks} />
                <h2 className="text-xl">Toon Episodes</h2>
              </div>
              <EpisodeForm initialData={toon} toonId={toon.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <Icon icon={HiFolderOpen} />
                <h2 className="text-xl flex items-center">
                  Upload all episodes at once{" "}
                  <span className="text-base italic capitalize">
                    &quot;Coming Soon&quot;
                  </span>
                  <Pause className="ml-2 animate-pulse h-4 w-4 text-sky-700" />
                </h2>
              </div>
              <BulkEpisodeForm initialData={toon} toonId={toon.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <Icon icon={CircleDollarSign} />
                <h2 className="text-xl">Daily Pass</h2>
              </div>
              <DailyPassForm initialData={toon} toonId={toon.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <Icon icon={Music} />
                <h2 className="text-xl">Soundtracks & Attachments</h2>
              </div>
              <AttachmentForm initialData={toon} toonId={toon.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToonId;
