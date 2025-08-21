export const revalidate = 60;

import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";
import { getAllProductsWithImages } from "@/actions/product/get-all-products-with-images";
import { Pagination } from "@/components/ui/pagination/Pagination";

interface Props {
    params: Promise<{ subcategoryId: number }>
    searchParams: Promise<{ page: string }>
}

export default async function SubcategoriesPage({ params, searchParams }: Props) {

    const { subcategoryId } = await params;
    const pageParam = (await searchParams).page;
    const page = pageParam ? parseInt(pageParam) : 1;

    const { products, totalPages } = await getAllProductsWithImages(
        { page, subcategory: subcategoryId, isAdminPage: false }
    );

    return (
        <div>
            <Title
                title={`${products![0].subcategory} `}
                subtitle="Todos los productos"
                className="mb-2 ml-5 mt-7 sm:ml-0"
            />

            <ProductGrid
                products={products!}
            />

            <Pagination totalPages={totalPages!} />
        </div>
    );
}