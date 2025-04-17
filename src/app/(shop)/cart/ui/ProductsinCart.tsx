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
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
                            alt={product.title}
                            width={100}
                            height={100}
                            style={{
                                width: '100',
                                height: '100',
                            }}
                            className="mr-5 rounded"
                        />
                        <div>
                            <Link
                                className="hover:underline cursor-pointer"
                                href={`/product/${product.slug}`}>
                                {product.size} - {product.title}
                            </Link>
                            <p>{currencyFormat(product.price)}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                            <button
                                className="underline mt-3 cursor-pointer"
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
