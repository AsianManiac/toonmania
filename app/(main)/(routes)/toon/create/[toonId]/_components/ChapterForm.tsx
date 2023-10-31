"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Episode, Webtoon } from "@prisma/client";
import { EpisodeList } from "./EpisodeList";

interface EpisodeFormProps {
  initialData: Webtoon & { episodes: Episode[] };
  toonId: string;
}

const formSchema = z.object({
  title: z.string().min(2),
});

export const EpisodeForm = ({ initialData, toonId }: EpisodeFormProps) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/v1/toons/${toonId}/episodes`, values);
      toast.success("Episdoe created successfully");
      toggleCreating();
      router.refresh();
    } catch (error: any) {
      toast.error("Somting went wrong", error);
    }
    console.log(values);
  };

  const onReorder = async (updatedData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/v1/toons/${toonId}/episodes/reorder`, {
        list: updatedData,
      });
      toast.success("Episodes reordered successfully");
      router.refresh();
    } catch (error: any) {
      toast.error("Somting went wrong", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/toon/create/${toonId}/episode/${id}`);
  };

  return (
    <div className="relative mt-6 bg-slate-200 rounded-md p-4">
      {isUpdating && (
        <div
          className="absolute h-full w-full bg-slate-500/20
       top-0 ring-offset-neutral-50 rounded-md flex items-center justify-center"
        >
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Toon episode
        <Button onClick={toggleCreating} variant={"ghost"}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h4 w-4 mr-2" />
              Add an episode
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Wonderful start"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="font-semibold text-green-500">
                    You can edit each episode individually and upload the
                    episode
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.episodes.length && "text-slate-500 italic"
          )}
        >
          {!initialData.episodes.length && "No episodes added yet"}
          <EpisodeList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.episodes || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-sm text-muted-foreground mt-4">
          Reorder the episodes
        </p>
      )}
    </div>
  );
};
