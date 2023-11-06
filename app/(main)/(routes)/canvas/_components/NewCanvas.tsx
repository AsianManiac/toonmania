import Image from "next/image";
import React from "react";

const NewCanvas = () => {
  return (
    <div>
      <div className="grid grid-rows-3 bg-slate-400 grid-flow-col gap-4">
        <div className="row-start-1 bg-pink-300 row-span-4 ...">
          <div className="relative">
            <Image
              className="object-cover h-full w-full"
              objectFit="cover"
              alt="webtoon canvas new"
              fill
              src={`/webtoon/canvas/webtoon_canvas_news_20.png`}
            />
          </div>
        </div>
        <div className="row-start-1 bg-orange-300 row-end-5 ...">03</div>
      </div>
    </div>
  );
};

export default NewCanvas;
