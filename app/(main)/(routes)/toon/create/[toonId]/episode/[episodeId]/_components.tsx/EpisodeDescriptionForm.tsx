"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Episode } from "@prisma/client";
import { Preview } from "@/components/preview";

interface EpisodeDescriptionFormProps {
  initialData: Episode;
  toonId: string;
  episodeId: string;
}

const formSchema = z.object({
  description: z.string().min(2),
});

export const EpisodeDescriptionForm = ({
  initialData,
  toonId,
  episodeId,
}: EpisodeDescriptionFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/v1/toons/${toonId}/episodes/${episodeId}`,
        values
      );
      toast.success("Episode updated successfully");
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
        Episode description
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {!initialData.description && "No description"}
          {initialData.description && (
            <Preview value={initialData.description} />
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
