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

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Webtoon } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

interface GenreFormProps {
  initialData: Webtoon;
  toonId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  genreId: z.string().min(2),
});

export const GenreForm = ({ initialData, toonId, options }: GenreFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      genreId: initialData?.genreId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/v1/toons/${toonId}`, values);
      toast.success("Toon updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error: any) {
      toast.error("Somting went wrong", error);
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.genreId
  );

  return (
    <div className="mt-6 bg-slate-200 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Toon genre
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h4 w-4 mr-2" />
              Edit genre
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.genreId && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No genre"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="genreId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={...options} {...field} />
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
