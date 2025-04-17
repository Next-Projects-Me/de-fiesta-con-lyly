'use client';

import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector'
import { SizeSelector } from '@/components/product/size-selector/SizeSelector'
import { useState } from 'react'
import { CartProduct, Product, Size } from '../../../../../interfaces/product.interface';
import { useCartStore } from '@/store/cart/cart-store';

interface Props {
    product: Product
}

export const AddToCar = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const addToCart = () => {
        setPosted(true);
        if (!size) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }

    return (
        <>
            {
                posted && !size && (
                    <span className="text-red-500 font-bold fade-in">
                        Debe seleccionar una talla*
                    </span>
                )
            }

            <SizeSelector
                selectedSize={size}
                availabelSizes={product?.sizes}
                onSizeChanged={setSize}
            />

            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            <button className="btn-primary my-5 cursor-pointer" onClick={addToCart}>
                Agregar al carrito
            </button>
        </>
    )
}
