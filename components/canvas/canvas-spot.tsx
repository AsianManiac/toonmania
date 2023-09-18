import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { title } from "process";
import { homeDateToon } from "@/data/home-webtoon";
import CanvasSpotItem from "./canvas-spot-item";

const CanvasSpot = () => {
    const router = useRouter()
    return ( 
        <div className="flex flex-row justify-center items-center">
            {/* Opening Canvas Sector */}
            <div className="text-sm font-medium">
                <p className="p-5">Have a story to tell?,<br />
                Share it on WEBTOON CANVAS. <br />
                Find everything you need to get it published.</p>
                <Button 
                    onClick={() => {}}
                    variant={"primary"} 
                    size={"lg"}
                    className="rounded-3xl bg-[#00dc64]"
                >
                    Find out more
                </Button>
            </div>
            {/* Canvas view section */}
            <div className="grid grid-cols-5 gap-2 py-12">
                {homeDateToon.slice(32, 42).map((canvas, index) => (

                    <CanvasSpotItem
                        key={index}
                        title={canvas.title}
                        author={canvas.author}
                        image={canvas.image}
                    />
                ))}
            </div>
        </div>
     );
}
 
export default CanvasSpot;