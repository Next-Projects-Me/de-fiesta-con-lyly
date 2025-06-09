import { Product } from "@/interfaces/product.interface";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
    products: Product[];
}

export const ProductGrid = ({ products }: Props) => {

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 mb-10">
            {
                products.map(product => (
                    <ProductGridItem
                        product={product}
                        key={product.slug} />
                ))
            }
        </div>
    )
}
