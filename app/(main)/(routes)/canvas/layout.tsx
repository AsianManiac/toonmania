import getCurrentUser from "@/actions/getCurrentUser";

const paths = [
  {
    name: "NEW & TRENDING",
  },
  {
    name: "ORIGINALS & GENRES",
  },
  {
    name: "CANVAS & TRENDING",
  },
];

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentuser = await getCurrentUser();

  return (
    <div className="flex max-h-screen flex-col items-center justify-between">
      <div className="shadow-sm border-b-[1px] border-gray-300/70 w-full bg-white sticky z-40">
        <div className="flex flex-row items-center justify-center space-x-5">
          {paths.map((path) => (
            <p className="text-xs font-semibold text-gray-500/50 cursor-pointer py-5 hover:text-slate-900">
              {path.name}
            </p>
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
