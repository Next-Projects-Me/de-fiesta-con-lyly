export const revalidate = 10080; // 7 días

import notFound from "../not-found";
import { ProductSlideshow } from "@/components/product/slideshow/ProductSlideshow";
import { ProductMobileSlideshow } from "@/components/product/slideshow/ProductMobileSlideshow";
import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { Metadata } from "next";
import { AddToCar } from "./ui/AddToCar";
import { currencyFormat } from "@/utils/currencyFormat";

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { slug } = await params
    const product = await getProductBySlug(slug);

    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            images: [`/products/${product?.images[1]}`],
        },
    }
}

export default async function ProductBySlugPage({ params }: Props) {

    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="sm:mt-20 mb-20 flex flex-col justify-center lg:flex-row gap-3">
            <div className="">

                <ProductMobileSlideshow
                    title={product?.title}
                    images={product?.images}
                    className="block md:hidden"
                />

                <ProductSlideshow
                    title={product?.title}
                    images={product?.images}
                    className="hidden md:flex"
                />

            </div>

            <div className="px-5">

                <StockLabel id={product?.id ?? 0} />

                <h1 className={`antialiased font-bold text-xl`}>
                    {product?.title}
                </h1>
                <p className="text-lg mb-5">{currencyFormat(product!.price)}</p>

                <AddToCar product={product!} />

                <p className="font-bold text-sm">
                    Descripción
                </p>
                <p className="font-light">
                    {product?.description}
                </p>

            </div>
        </div>
    );
}