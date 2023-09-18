import getCurrentUser from "@/actions/getCurrentUser";
import ClientOnly from "@/components/client";
import Footer from "@/components/footer/footer";
import Header from "@/components/header";
import CreateToonModal from "@/components/modals/create-toon";
import LoginModal from "@/components/modals/loginModal";
import RegisterModal from "@/components/modals/registerModal";
import ToasterProvider from "@/components/providers/toaster-provider";

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    const currentuser = await getCurrentUser() 

    return ( 
        <div className="flex max-h-screen flex-col items-center justify-between">
            <ClientOnly>
                <Header currentUser={currentuser}/>
                <ToasterProvider/>
                <RegisterModal/>
                <LoginModal/>
                <CreateToonModal/>
            </ClientOnly>
            <main className="h-full w-full">
                {children}
            </main>
            <div className="w-full pb-14">
                <Footer/>
            </div>
        </div>
     );
}
 
export default MainLayout;