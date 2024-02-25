"use client";
import axios from "axios";
import { Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

import FileUpload from "@/components/inputs/file-upload";
import { Button } from "@/components/ui/button";
import { Episode, Webtoon } from "@prisma/client";
import { FcDocument } from "react-icons/fc";

interface EpisodeListFormProps {
  initialData: Episode;
  toon?: Webtoon;
  toonId: string;
  episodeId: string;
}

const formSchema = z.object({
  episodeUrl: z.string().min(2),
});

export const EpisodeListForm = ({
  initialData,
  toon,
  toonId,
  episodeId,
}: EpisodeListFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deletingId, setdeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/v1/toons/${toonId}/episodes/${episodeId}`,
        values
      );
      toast.success("Toon episode updated");
      toggleEdit();
      router.refresh();
    } catch (error: any) {
      toast.error("Somting went wrong", error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      setdeletingId(id);
      await axios.delete(`/api/v1/toons/${toonId}/episodes/${episodeId}/${id}`);
      toast.success("Soundtracks deleted");
      // toggleEdit();
      router.refresh();
    } catch (error: any) {
      toast.error("Somting went wrong", error);
    } finally {
      setdeletingId(null);
    }
  };

  return (
    <div className="mt-6 bg-slate-200 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Toon Episodes
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.episodeUrl && (
            <>
              <PlusCircle className="h4 w-4 mr-2" />
              Add an episode
            </>
          )}
          {!isEditing && initialData.episodeUrl && (
            <>
              <Pencil className="h4 w-4 mr-2" />
              Edit Episode
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {!initialData.episodeUrl ? (
            <div
              className="text-base text-center mt-2 text-slate-500 italic h-52 w-[70%] mx-auto bg-slate-300 rounded-md flex flex-col items-center justify-center"
              aria-label="one"
            >
              <FcDocument className="h-10 w-10 " />
              <span className="text-slate-500">
                No episode for {toon?.title} episode {initialData.episodeNumber}
              </span>
            </div>
          ) : (
            <div className="relative mt-2 aspect-auto"></div>
          )}
        </>
      )}
      {isEditing && (
        <>
          <FileUpload
            value=""
            accept={
              "application/x-zip-compressed, application/x-rar-compressed, application/x-tar"
            }
            endpoint={`/api/uploads/${toonId}/${episodeId}`}
            onChange={(url) => {
              if (url) {
                onSubmit({ episodeUrl: url });
              }
            }}
          />
          <div className="text-sm text-muted-foreground mt-4">
            Episodes can be uploaded only as{" "}
            <strong className="italic">&quot;zip&quot;</strong> files
          </div>
        </>
      )}
      {initialData.episodeUrl && !isEditing && (
        <div className="text-sm text-muted-foreground mt-2">
          May take some time to completely unzip the episode
        </div>
      )}
    </div>
  );
};
