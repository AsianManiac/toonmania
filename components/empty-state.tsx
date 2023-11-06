"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/heading";

interface EmptyStateProps {
  title?: any;
  subtitle?: any;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No toons where found for this genre",
  subtitle = "Change the genre to see content of different interest",
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center
            "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            onClick={() => {
              router.push("/genres");
            }}
            className=""
            size={"lg"}
            variant={"destructive"}
          >
            Clear genre
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
