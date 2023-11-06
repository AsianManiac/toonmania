"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Music } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TbMusicCancel } from "react-icons/tb";
import { z } from "zod";

interface PlayerProps {
  playing: boolean;
  paused: boolean;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Toon title is required",
  }),
});

export const Player = ({ playing, paused }: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [pause, setPause] = useState<boolean>(false);

  const onPlay = () => {
    if (isPlaying) {
      setPause(true);
    } else {
      setPause(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  return (
    <button onClick={onPlay}>
      {isPlaying ? (
        <>
          <Music className="text-primary h-8 w-8 cursor-pointer" />
        </>
      ) : (
        <>
          <TbMusicCancel className="text-primary h-8 w-8 cursor-pointer" />
        </>
      )}
    </button>
  );
};
