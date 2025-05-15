import { Footer } from "@/components/ui/footer/Footer";
import { LeftSidebar } from "@/components/ui/left-sidebar/LeftSidebar";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({ children }: {
    children: React.ReactNode;
}) {

    return (
        <main className="min-h-screen">
            <TopMenu />
            <Sidebar />
            <LeftSidebar />
            <div className="px-0 sm:px-10 pt-[40%] sm:pt-50 ">
                {children}
            </div>
            <Footer />
        </main>
    );
}