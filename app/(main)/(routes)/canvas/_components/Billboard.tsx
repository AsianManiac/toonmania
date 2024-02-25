"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const Billboard = () => {
  return (
    <div className="relative h-[56.25vw]">
      <video
        autoPlay
        muted
        loop
        poster={`webtoon/canvas/video/WEBTOONAcademy_EN_Ep02_Thumb.jpg`}
        src={`/webtoon/canvas/video/Creators 101 -- WEBTOON CANVAS_2.mp4`}
        className="w-full h-[56.25vw] object-cover brightness-[80%]"
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-2xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          Make comics, reach millions
        </p>
        <p className="text-white text-sm md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          TOONMANIA&apos;s most popular titles began on WEBTOON CANVAS by
          creators like you.
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4">
          <Button
            onClick={() => {}}
            size={"lg"}
            className="rounded-full text-black bg-white hover:text-white"
          >
            Get started now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
