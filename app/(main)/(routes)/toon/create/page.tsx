"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Toon title is required",
  }),
  author: z.string().min(2, {
    message: "Toon author is required",
  }),
});

export default function CreateToon() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/v1/toons", values);
      router.push(`/toon/create/${response.data.id}`);
      toast.success("Toon created successfully");
    } catch (error: any) {
      toast.error("Somting went wrong", error);
    }
    console.log(values);
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Toon name</h1>
        <p className="text-sm text-slate-600">
          Give a suitable name for your toon here. This name can be changed
          later on in the toon edit page without issues.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Toon Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Morgana and Oz"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What is the name of the toon of your creation?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Toon Author</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="SIU"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What is the name of the author of your toon?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 flex-row-reverse">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Create Toon
              </Button>
              <Link href={`/`}>
                <Button type="button" variant={"destructive"}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
