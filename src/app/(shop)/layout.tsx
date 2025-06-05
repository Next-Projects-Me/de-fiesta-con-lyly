import { getCategories } from "@/actions/categories/get-categories";
import { Footer } from "@/components/ui/footer/Footer";
import { LeftSidebar } from "@/components/ui/left-sidebar/LeftSidebar";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

export default async function ShopLayout({ children }: {
    children: React.ReactNode;
}) {

    const categories = await getCategories();

    return (
        <main className="min-h-screen">
            <TopMenu categories={categories} />
            <Sidebar />
            <LeftSidebar />
            <div className="px-0 sm:px-10 pt-[40%] sm:pt-36 ">
                {children}
            </div>
            <Footer />
        </main>
    );
}