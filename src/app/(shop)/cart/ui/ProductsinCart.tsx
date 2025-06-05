'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart/cart-store";
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { currencyFormat } from "@/utils/currencyFormat";

export const ProductsinCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct)

    useEffect(() => {
        setLoaded(true);
    }, [])

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}-${product.color}-${product.number}-${product.gender}`}
                        className="flex border-b-2 border-gray-200 mb-5">
                        <Image
                            src={`/products/${product.image}`}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="mr-5 rounded w-42 h-42"
                        />
                        <div className="">
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
                                    product.number && <p>Letras: {product.number}</p>
                                }

                            </div>

                            <p className="my-2">{currencyFormat(product.price)}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                            <button
                                className="underline mt-3 mb-5 cursor-pointer"
                                onClick={() => removeProduct(product)}
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
