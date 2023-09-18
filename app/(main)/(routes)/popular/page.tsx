import { useSearchParams } from "next/navigation";

import ClientOnly from "@/components/client";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import ToonGenre from "@/components/navbar/toon-genre";
import MainToon from "@/components/toonmania/main-toon";
import { homeDateToon } from "@/data/home-webtoon";
import GenreToons from "@/components/genre-toons";

const PopularPage = async () => {
    const toons = await homeDateToon;

    if (toons.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset/>
            </ClientOnly>
        )
    }
    return ( 
        <GenreToons/>
     );
}
 
export default PopularPage;