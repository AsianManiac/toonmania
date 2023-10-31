"use client";
import axios from "axios";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

import FileUpload from "@/components/inputs/file-upload";
import { Button } from "@/components/ui/button";
import { Attachments, Episode } from "@prisma/client";

interface EpisodeAttachmentFormProps {
  initialData: Episode & { attachments: Attachments[] };
  toonId: string;
  episodeId: string;
}

const formSchema = z.object({
  url: z.string().min(2),
});

export const EpisodeAttachmentForm = ({
  initialData,
  toonId,
  episodeId,
}: EpisodeAttachmentFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deletingId, setdeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/v1/toons/${toonId}/attachments/episodes/${episodeId}`,
        values
      );
      toast.success("Toon soundtracks attached successfully");
      toggleEdit();
      router.refresh();
    } catch (error: any) {
      toast.error("Somting went wrong", error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      setdeletingId(id);
      await axios.delete(
        `/api/v1/toons/${toonId}/attachments/episodes/${episodeId}/${id}`
      );
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
        Toon Episode Soundtracks
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h4 w-4 mr-2" />
              Add a soundtrack
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">No soundtracks</p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto hover:opacity-75 transition"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <>
          <FileUpload
            value=""
            accept={"audio/mpeg, audio/wav, audio/ogg"}
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-sm text-muted-foreground mt-4">
            Add soundtracks that can play along the toon episode
          </div>
        </>
      )}
    </div>
  );
};
