export const revalidate = 10080; // 7 días

import notFound from "../not-found";
import { titleFont } from "@/config/fonts";
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

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

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
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-1 md:col-span-2">

                <ProductMobileSlideshow
                    title={product?.title}
                    images={product?.images}
                    className="block md:hidden"
                />

                <ProductSlideshow
                    title={product?.title}
                    images={product?.images}
                    className="hidden md:block"
                />

            </div>

            <div className="col-span-1 px-5">

                <StockLabel slug={product?.slug ?? ''} />

                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product?.title}
                </h1>
                <p className="text-lg mb-5">{currencyFormat(product.price)}</p>

                <AddToCar product={product} />

                <h3 className="font-bold text-sm">
                    Descripción
                </h3>
                <p className="font-light">
                    {product?.description}
                </p>

            </div>
        </div>
    );
}