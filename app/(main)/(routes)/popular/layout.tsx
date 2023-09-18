import Footer from "@/components/footer/footer";
import ToonGenre from "@/components/navbar/toon-genre";

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="flex min-h-screen flex-col items-center justify-between">
            <main className="h-full w-full">
                <ToonGenre/>
                {children}
            </main>
        </div>
     );
}
 
export default MainLayout;