import Image from "next/image";
import Billboard from "./_components/Billboard";
import NewCanvas from "./_components/NewCanvas";

const CanvasPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Billboard />
      <NewCanvas />
    </div>
  );
};

export default CanvasPage;
