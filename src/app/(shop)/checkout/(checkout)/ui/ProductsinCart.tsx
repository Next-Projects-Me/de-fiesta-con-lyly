'use client';

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import Link from "next/link";
import { ProductImage } from "@/components/product/product-image/ProductImage";

export const ProductsinCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <div className="border-interface p-5 mb-5">
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}-${product.color}-${product.number}-${product.letter}-${product.gender}`}
                        className="flex flex-col sm:flex-row items-center sm:items-start border-b-2 border-gray-200 mb-5">
                        <ProductImage
                            src={product.image}
                            alt={product.title}
                            width={400}
                            height={400}
                            className="object-fill rounded w-full h-62 sm:w-42 sm:h-42 mb-5"
                        />
                        <div className="sm:ml-4 sm:mt-0 w-full sm:w-fit">
                            <Link className="hover:underline cursor-pointer font-bold"
                                href={`/product/${product.slug}`}>
                                {product.title}
                            </Link>
                            <div className="mt-3">
                                {
                                    product.size && <p>Talla: {product.size}</p>
                                }
                                {
                                    product.color && (
                                        <div className="flex items-center">
                                            <p>Color: </p>
                                            <div className="w-5 h-5 rounded-full ml-2" style={{ background: product.color }}></div>
                                        </div>
                                    )
                                }
                                {
                                    product.number && <p>Número: {product.number}</p>
                                }
                                {
                                    product.letter && <p>Letras: {product.letter}</p>
                                }

                            </div>
                            <p className="my-2">{currencyFormat(product.price)}</p>
                            <p className="mb-5">Cantidad: {product.quantity}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
