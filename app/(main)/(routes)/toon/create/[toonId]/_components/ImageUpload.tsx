"use client";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";

import ImageUpload from "@/components/inputs/image-uplaod";
import { Button } from "@/components/ui/button";
import { Webtoon } from "@prisma/client";
import Image from "next/image";

interface ImageUploadFormProps {
  initialData: Webtoon;
  toonId: string;
}

const formSchema = z.object({
  coverImage: z.string().min(2, {
    message: "Toon image is required",
  }),
});

export const ImageUploadForm = ({
  initialData,
  toonId,
}: ImageUploadFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/v1/toons/${toonId}`, values);
      toast.success("Toon updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error: any) {
      toast.error("Somting went wrong", error);
    }
    console.log(values);
  };

  return (
    <div className="mt-6 bg-slate-200 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Toon image
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.coverImage && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Image
            </>
          )}
          {!isEditing && initialData.coverImage && (
            <>
              <Pencil className="h4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.coverImage ? (
          <div className="flex flex-col items-center justify-center h-60 bg-slate-300 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
            <p className="text-slate-500 italic">No image Uploaded</p>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Cover Image"
              fill
              className="object-cover h-full w-full rounded-md"
              src={`/webtoon/images/${initialData.coverImage}`}
            />
          </div>
        ))}
      {isEditing && (
        <>
          <ImageUpload
            value=""
            onChange={(url) => {
              if (url) {
                onSubmit({ coverImage: url });
              }
            }}
          />
          <div className="flex items-center gap-x-2">
            <Button type="submit">Save</Button>
          </div>
        </>
      )}
    </div>
  );
};
