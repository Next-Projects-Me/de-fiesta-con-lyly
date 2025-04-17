export const revalidate = 60;

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";
import { Gender } from "@prisma/client";

interface Props {
    params: Promise<{ gender: Gender }>
    searchParams: Promise<{ page: string }>
}

export default async function GenderByIdPage({ params, searchParams }: Props) {

    const { gender } = await params;
    const pageParam = (await searchParams).page;
    const page = pageParam ? parseInt(pageParam) : 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender });

    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    const label: Record<string, string> = {
        'men': 'para hombres',
        'women': 'para mujeres',
        'kid': 'para niños',
        'unisex': 'para todos'
    }


    // if( id === 'kids'){
    //   notFound();
    // }

    return (
        <div>
            <Title
                title={`Artículos de ${label[gender]} `}
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