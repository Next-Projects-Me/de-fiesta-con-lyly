import { Product } from "@/interfaces/product.interface";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
    products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
    return (
        <div className="px-5 sm:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-10">
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
