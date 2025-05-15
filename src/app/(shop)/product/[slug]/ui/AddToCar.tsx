'use client';

import { CartProduct, Product } from '../../../../../interfaces/product.interface';
import { ColorSelector } from '@/components/product/color-selector/ColorSelector';
import { NumberSelector } from '@/components/product/number-selector/NumberSelector';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector'
import { SizeSelector } from '@/components/product/size-selector/SizeSelector'
import { useCartStore } from '@/store/cart/cart-store';
import { useState } from 'react'

interface Props {
    product: Product
}

export const AddToCar = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [errorMessage, setErrorMessage] = useState("");
    const [size, setSize] = useState<string | undefined>();
    const [number, setNumber] = useState<string | undefined>();
    const [color, setColor] = useState<string | undefined>();

    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);


    const addToCart = () => {

        setPosted(true);
        setErrorMessage("")

        if (product.colors?.length !== 0 && !color) {
            setErrorMessage("Debe seleccionar un color*");
            return;
        }
        if (product.sizes?.length !== 0 && !size) {
            setErrorMessage("Debe seleccionar una talla*");
            return;
        }
        if (product.numbers?.length !== 0 && !number) {
            setErrorMessage("Debe seleccionar un número*");
            return;
        }

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            color: color,
            number: number,
            image: product.images[0]
        }

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
        setColor(undefined);
        setNumber(undefined);
    }

    return (
        <>
            {
                (product.colors?.length !== 0) && (
                    <ColorSelector
                        selectedColor={color}
                        availableColors={product.colors}
                        onColorChanged={setColor}
                    />
                )
            }

            {
                (product.sizes?.length !== 0) && (
                    <SizeSelector
                        selectedSize={size}
                        availableSizes={product.sizes}
                        onSizeChanged={setSize}
                    />
                )
            }

            {
                (product.numbers?.length !== 0) && (
                    <NumberSelector
                        selectedNumber={number}
                        availableNumbers={product.numbers}
                        onNumberChanged={setNumber}
                    />
                )
            }

            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            {
                posted && errorMessage && (
                    <p className="text-red-500 mt-5 font-bold fade-in">
                        {errorMessage}
                    </p>
                )
            }

            <button className="btn-primary my-5 cursor-pointer" onClick={addToCart}>
                Agregar al carrito
            </button>


        </>
    )
}
