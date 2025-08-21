export const revalidate = 60;

import { getAllProductsWithImages } from "@/actions/product/get-all-products-with-images";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { NotFoundProduct } from "@/components/ui/not-found/NotFoundProduct";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { WhatsAppButton } from "@/components/ui/social-media/whatsapp-button/WhatsAppButton";
import { Title } from "@/components/ui/title/Title";

interface Props {
    searchParams: Promise<{ page?: string, searching?: string }>
}

export default async function HomePage({ searchParams }: Props) {

    const params = (await searchParams);
    const page = params.page ? parseInt(params.page) : 1;
    const searching = params.searching;

    const { products, totalPages = 1 } = await getAllProductsWithImages(
        { page, searching, isAdminPage: false }
    );

    if (products?.length === 0) {
        return (
            <NotFoundProduct />
        )
    }

    return (
        <div className="sm:px-0">
            <Title
                title={`Tienda`}
                subtitle="Todos los productos"
                className="mb-2 ml-5 mt-7 sm:ml-0"
            />
            <ProductGrid
                products={products!}
            />
            <WhatsAppButton />
            <Pagination totalPages={totalPages!} />
        </div>
    );
}
