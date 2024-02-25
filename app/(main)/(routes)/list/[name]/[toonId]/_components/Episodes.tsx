import { Episode, Webtoon } from "@prisma/client";
import { EpisodeList } from "./EpisodeList";

export interface EpisodeProps {
  toon: Webtoon & {
    episodes: Episode[];
  };
}

export const Episodes = async ({ toon }: EpisodeProps) => {
  return (
    <div>
      <div>{toon.title}</div>
      <div>
        {toon.episodes.map((episode) => (
          <ul className="flex flex-col-reverse" key={episode.id}>
            <EpisodeList
              id={episode.id}
              label={episode.title}
              toonId={toon.id}
              author={toon.authorId}
              name={toon.slug}
              episodeImage={episode.imageUrl!}
              likes={episode.position}
              episodeNo={episode.episodeNumber!}
              episodeUrl={episode.episodeUrl!}
              isFree={!episode.isFree}
            />
          </ul>
        ))}
      </div>
    </div>
  );
};
