import Footer from "@/components/footer/footer";
import Header from "@/components/header";

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="flex min-h-screen flex-col items-center justify-between">
            <main className="h-full w-full">
                <Header/>
                {children}
            </main>
            <div className="w-full pb-14">
                <Footer/>
            </div>
        </div>
     );
}
 
export default MainLayout;