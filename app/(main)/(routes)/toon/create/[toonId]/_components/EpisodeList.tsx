"use client";

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Episode } from "@prisma/client";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EpisodeListProps {
  items: Episode[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const EpisodeList = ({ items, onReorder, onEdit }: EpisodeListProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [episodes, setEpisodes] = useState<Episode[]>(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(episodes);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedEpisodes = items.slice(startIndex, endIndex + 1);

    setEpisodes(items);

    const bulkUpdateData = updatedEpisodes.map((episode) => ({
      id: episode.id,
      position: items.findIndex((item) => item.id === episode.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="episodes">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {episodes.map((episode, index) => (
              <Draggable
                key={episode.id}
                draggableId={episode.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gapx2 bg-slate-300 border-slate-300 border text-slate-700 rounded-md mb-4 text-sm",
                      episode.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-400 rounded-l-md transition",
                        episode.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <p className="px-2">{episode.title}</p>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          episode.isPublished && "bg-sky-700"
                        )}
                      >
                        {episode.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(episode.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
