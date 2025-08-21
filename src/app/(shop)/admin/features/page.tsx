export const dynamic = "force-dynamic";

import { CategoriesForm } from "./ui/CategoriesForm";
import { ProductFeaturesForm } from "./ui/ProductFeaturesForm";
import { getSizes } from "@/actions/features/get-sizes";
import { getColors } from "@/actions/features/get-colors";
import { getAllCategories } from "@/actions/categories/get-all-categories";
import { getCosts } from "@/actions/costs/get-costs";
import { Toaster } from "sonner";
import { AdditionalCostsForm } from "./ui/AdditionalCostsForm";

export default async function FeaturesPage() {

    const categories = await getAllCategories();
    const sizes = await getSizes();
    const colors = await getColors();
    const costs = await getCosts();

    return (
        <>
            <Toaster richColors position="bottom-right" />
            <CategoriesForm categories={categories} />
            <ProductFeaturesForm colors={colors!} sizes={sizes!} />
            <AdditionalCostsForm costs={costs!} />
        </>
    );
}