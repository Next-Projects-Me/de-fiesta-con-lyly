export const revalidate = 60;

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";

interface Props {
    params: Promise<{ categoryId: number }>
    searchParams: Promise<{ page: string }>
}

export default async function GenderByIdPage({ params, searchParams }: Props) {

    const { categoryId } = await params;
    const pageParam = (await searchParams).page;
    const page = pageParam ? parseInt(pageParam) : 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({ page, categoryId });

    if (products.length === 0) {
        redirect(`/category/${products[0].category}`);
    }

    // const label: Record<string, string> = {
    //     'men': 'para hombres',
    //     'women': 'para mujeres',
    //     'kid': 'para niños',
    //     'unisex': 'para todos'
    // }


    // if( id === 'kids'){
    //   notFound();
    // }

    return (
        <div>
            <Title
                title={`${products[0].category} `}
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