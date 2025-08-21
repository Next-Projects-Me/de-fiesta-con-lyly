import { getActiveCategories } from "@/actions/categories/get-active-categories";
import { Footer } from "@/components/ui/footer/Footer";
import { LeftSidebar } from "@/components/ui/left-sidebar/LeftSidebar";
import { Searchbar } from "@/components/ui/searchbar/Searchbar";
import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";

export default async function ShopLayout({ children }: {
    children: React.ReactNode;
}) {

    const categories = await getActiveCategories();

    return (
        <main className="min-h-screen flex flex-col">
            <TopMenu categories={categories} />
            <Sidebar />
            <Searchbar />
            <LeftSidebar categories={categories} />

            <div className="sm:px-10 pt-[38%] sm:pt-36">
                {children}
            </div>
            <Footer />
        </main>
    );
}