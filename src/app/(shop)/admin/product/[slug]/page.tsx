import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { AdminProductForm } from "./ui/AdminProductForm";
import { getColors } from "@/actions/features/get-colors";
import { getSizes } from "@/actions/features/get-sizes";
import { getActiveSubcategories } from "@/actions/categories/get-active-subcategories";

interface Props {
    params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {

    const { slug } = await params;

    const [product, subcategories, sizes, colors] = await Promise.all([
        getProductBySlug(slug),
        getActiveSubcategories(),
        getSizes(),
        getColors(),
    ]);

    if (!product && slug !== 'new') {
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto';


    return (
        <>
            <Title title={title} className="ml-5 sm:ml-0" />
            <AdminProductForm
                product={product ?? {}}
                subcategories={subcategories}
                sizes={sizes!}
                colors={colors!}
            />
        </>
    );
}