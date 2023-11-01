import ToonGenre from "@/components/navbar/toon-genre";
import db from "@/lib/db";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const genres = await db.genre.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <main className="h-full w-full">
        <ToonGenre items={genres} />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
