import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getSubcategories } from "@/actions/categories/get-subcategories";
import { getColors } from "@/actions/features/get-colors";
import { getSizes } from "@/actions/features/get-sizes";

interface Props {
    params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {

    const { slug } = await params;

    const [product, subcategories, sizes, colors] = await Promise.all([
        getProductBySlug(slug),
        getSubcategories(),
        getSizes(),
        getColors(),
    ]);

    if (!product && slug !== 'new') {
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto';


    return (
        <>
            <Title title={title} />
            <ProductForm
                product={product ?? {}}
                subcategories={subcategories}
                sizes={sizes}
                colors={colors}
            />
        </>
    );
}