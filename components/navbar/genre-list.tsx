import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";
import { cn } from "@/lib/utils";

interface GenreListprops {
  label: String;
  value: String;
  selected?: boolean;
}
const GenreList = ({ label, value, selected }: GenreListprops) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      genre: value,
    };

    if (params?.get("genre") === value) {
      delete updatedQuery.genre;
    }

    const url = qs.stringifyUrl(
      {
        url: "/genres/",
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer",
        selected && "border-b-neutral-800 text-neutral-800"
      )}
    >
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default GenreList;
