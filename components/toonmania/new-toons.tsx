import { RapidToonProps } from "@/types";
import Datetoons from "./date-toons";
import { fetchToon } from "@/helpers/FetchToons";
import { toons } from "@/data/toons";
import { homeDateToon } from "@/data/home-webtoon";

const NewToons = async () => {
  // const allToons = await fetchToon();
  // const titleList: RapidToonProps[] =
  //   allToons.message?.result?.titleList.titles.slice(0, 3);

  // const isToonEmpty =
  //   !Array.isArray(titleList) || titleList.length < 1 || !titleList;

  // console.log(titleList);
  return (
    <div className="w-full border-b-[1px] border-gray-300/70 pb-6">
      <div className="flex justify-center flex-col space-x-2 items-center py-7">
        <div>
          <p className="font-semibold text-xl pb-8">New TOONS</p>
        </div>
        <div className="grid lg:grid-cols-5 grid-cols-3 gap-2">
          {homeDateToon.slice(0, 10).map((item) => (
            <Datetoons
              key={item.author}
              image={item.image}
              title={item.title}
              genre={item.genre}
              author={item.author}
              likes={item.likes}
              longSummary={item.longSummary}
              shortSummary={item.shortSummary}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewToons;
