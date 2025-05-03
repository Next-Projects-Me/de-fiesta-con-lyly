export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

interface Props {
    searchParams: Promise<{ page?: string }>
}

export default async function HomePage({ searchParams }: Props) {

    const pageParam = (await searchParams).page;
    const page = pageParam ? parseInt(pageParam) : 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({ page });

    if (products.length === 0) {
        redirect('/');
    }

    return (
        <>
            <Title
                title="Tienda"
                subtitle="Todas las categorías"
                className="mb-2"
            />

            <ProductGrid
                products={products}
            />

            <Pagination totalPages={totalPages} />
        </>
    );
}
