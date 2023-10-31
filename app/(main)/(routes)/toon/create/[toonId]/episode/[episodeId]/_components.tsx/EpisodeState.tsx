"use client";

import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface EpisodeStateProps {
  disabled: boolean;
  toonId: string;
  episodeId: string;
  isPublished: boolean;
}

export const EpisodeState = ({
  disabled,
  toonId,
  episodeId,
  isPublished,
}: EpisodeStateProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/v1/toons/${toonId}/episodes/${episodeId}/unpublish`
        );
        toast.success("Episodes unpublished successfully");
        router.refresh();
      } else {
        await axios.patch(
          `/api/v1/toons/${toonId}/episodes/${episodeId}/publish`
        );
        toast.success("Episodes published successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/v1/toons/${toonId}/episodes/${episodeId}`);

      toast.success("Episodes deleted successfully");
      router.refresh();
      router.push(`/toon/create/${toonId}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={"sm"} disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
