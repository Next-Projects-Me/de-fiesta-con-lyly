export const revalidate = 60;

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";

interface Props {
    params: Promise<{ subcategoryId: number }>
    searchParams: Promise<{ page: string }>
}

export default async function SubcategoriesPage({ params, searchParams }: Props) {

    const { subcategoryId } = await params;
    const pageParam = (await searchParams).page;
    const page = pageParam ? parseInt(pageParam) : 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({ page, subcategoryId });

    if (products.length === 0) {
        redirect(`/category/${products[0].subcategoryId}`);
    }

    return (
        <div>
            <Title
                title={`${products[0].subcategory} `}
                subtitle="Todos los productos"
                className="mb-2"
            />

            <ProductGrid
                products={products}
            />

            <Pagination totalPages={totalPages} />
        </div>
    );
}