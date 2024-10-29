import { Icon } from "@/components/icon";
import db from "@/lib/db";
import { ArrowLeft, Eye, LayoutDashboard, Music } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FcReadingEbook } from "react-icons/fc";
import { EpisodeAccessForm } from "./_components.tsx/EpisodeAccessForm";
import { EpisodeAttachmentForm } from "./_components.tsx/EpisodeAttachmentForm";
import { EpisodeDescriptionForm } from "./_components.tsx/EpisodeDescriptionForm";
import { EpisodeImageUploadForm } from "./_components.tsx/EpisodeImageUpload";
import { EpisodeListForm } from "./_components.tsx/EpisodeListForm";
import { EpisodeNumberForm } from "./_components.tsx/EpisodeNumberForm";
import { EpisodeTitleForm } from "./_components.tsx/EpisodeTitleForm";
import Banner from "@/components/banner";
import { EpisodeState } from "./_components.tsx/EpisodeState";

const EpisodeId = async ({
  params,
}: {
  params: {
    toonId: string;
    episodeId: string;
  };
}) => {
  const episode = await db.episode.findUnique({
    where: {
      id: params.episodeId,
      webtoonId: params.toonId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const toon = await db.webtoon.findUnique({
    where: {
      id: params.toonId,
    },
  });

  if (!episode) {
    toast.error("Unauthorised to access this toon");
    redirect("/");
  }

  const requiredFields = [
    episode.title,
    episode.description,
    episode.imageUrl,
    episode.episodeNumber,
    episode.episodeUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!episode.isPublished && (
        <Banner
          variant={"warning"}
          lable="This episode has not been made public, it won't be visible to users!"
        />
      )}
      <div className="p-6 ">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/toon/create/${params.toonId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2 ">
                <h1 className="text-2xl font-medium">Setup Episode</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <EpisodeState
                disabled={!isCompleted}
                toonId={params.toonId}
                episodeId={params.episodeId}
                isPublished={episode.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <Icon icon={LayoutDashboard} />
                <h2 className="text-xl">Customise your toon episode</h2>
              </div>
              <EpisodeTitleForm
                initialData={episode}
                toonId={params.toonId}
                episodeId={params.episodeId}
              />
              <EpisodeNumberForm
                initialData={episode}
                toonId={params.toonId}
                episodeId={params.episodeId}
              />
              <EpisodeDescriptionForm
                initialData={episode}
                toonId={params.toonId}
                episodeId={params.episodeId}
              />
              <EpisodeImageUploadForm
                initialData={episode}
                toonId={params.toonId}
                episodeId={params.episodeId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <Icon icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <EpisodeAccessForm
                initialData={episode}
                toonId={params.toonId}
                episodeId={params.episodeId}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <Icon icon={FcReadingEbook} />
                <h2>
                  Add Toon Episode{" "}
                  <strong>
                    {toon?.title}{" "}
                    <span className="italic text-muted-foreground underline">
                      #{episode.episodeNumber}
                    </span>
                  </strong>
                </h2>
              </div>
              <EpisodeListForm
                initialData={episode}
                toon={toon!}
                toonId={params.toonId}
                episodeId={params.episodeId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <Icon icon={Music} />
                <h2>Episode Soundtracks</h2>
              </div>
              <EpisodeAttachmentForm
                initialData={episode}
                toonId={params.toonId}
                episodeId={params.episodeId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpisodeId;
