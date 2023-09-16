import Image from "next/image";

const CanvasPage = () => {
    return ( 
        <div className="flex justify-center items-center h-screen bg-red-500">
  <div className="transform -rotate-6">
    <div className="bg-white p-8 mb-4 rounded-lg shadow-lg">
      <Image className="w-32 h-32 mb-4 rounded-full" src={`/hero-slider/4_GIF_SchoolBusGraveYard_091123_PC.gif`} fill alt="Image 1"/>
      <h2 className="text-2xl mb-2">Title 1</h2>
      <p className="text-gray-500 mb-4">Subtitle 1</p>
    </div>
    <div className="bg-white p-8 mb-4 rounded-lg shadow-lg">
      <Image className="w-32 h-32 mb-4 rounded-full" src={`/banner/4DesktopMiniBanner_US+28129.png`} fill alt="Image 2"/>
      <h2 className="text-2xl mb-2">Title 2</h2>
      <p className="text-gray-500 mb-4">Subtitle 2</p>
    </div>
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <Image className="w-32 h-32 mb-4 rounded-full" src={`/banner/5SmallBanner_B_us.png`} fill alt="Image 3"/>
      <h2 className="text-2xl mb-2">Title 3</h2>
      <p className="text-gray-500 mb-4">Subtitle 3</p>
    </div>
  </div>
</div>

     );
}
 
export default CanvasPage;