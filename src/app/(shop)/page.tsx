export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { redirect } from "next/navigation";
import { Title } from "@/components/ui/title/Title";
import { WhatsAppButton } from "@/components/ui/social-media/whatsapp-button/WhatsAppButton";

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
        <div className="px-5 sm:px-0">
            <Title
                title="Tienda"
                subtitle="Todos los productos"
                className="mb-2"
            />

            <ProductGrid
                products={products}
            />

            <Pagination totalPages={totalPages} />

            <WhatsAppButton />
        </div>
    );
}
