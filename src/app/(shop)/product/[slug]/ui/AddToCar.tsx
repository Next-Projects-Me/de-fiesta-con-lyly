'use client';

import { LetterInput } from '@/components/product/letter-input/LetterInput';
import { CartProduct, Product } from '../../../../../interfaces/product.interface';
import { ColorSelector } from '@/components/product/color-selector/ColorSelector';
import { NumberSelector } from '@/components/product/number-selector/NumberSelector';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector'
import { SizeSelector } from '@/components/product/size-selector/SizeSelector'
import { useCartStore } from '@/store/cart/cart-store';
import { addBusinessDaysCustom } from '@/utils/addBussinessDayCustom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react'
import { toast, Toaster } from 'sonner';
import Confetti from '@/components/ui/confetti/Confetti';

interface Props {
    product: Product
}

export const AddToCar = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [showConfetti, setShowConfetti] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [size, setSize] = useState<string | undefined>();
    const [number, setNumber] = useState<string | undefined>();
    const [color, setColor] = useState<string | undefined>();
    const [letter, setLetters] = useState<string | undefined>();

    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const today = new Date();

    const deliveryStart = addBusinessDaysCustom(today, 1);
    const deliveryEnd = addBusinessDaysCustom(today, 2);

    const formattedStart = format(deliveryStart, "EEEE d 'de' MMMM", { locale: es });
    const formattedEnd = format(deliveryEnd, "EEEE d 'de' MMMM", { locale: es });

    const addToCart = async () => {

        setPosted(true);
        setErrorMessage("")

        if (product.colors?.length !== 0 && !color) {
            setErrorMessage("Debes seleccionar un color*");
            return;
        }
        if (product.sizes?.length !== 0 && !size) {
            setErrorMessage("Debes seleccionar una talla*");
            return;
        }
        if (product.numbers?.length !== 0 && !number) {
            setErrorMessage("Debes seleccionar un número*");
            return;
        }
        if (product.letters && !letter) {
            setErrorMessage("Debes escribir al menos una letra*");
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
            letter: letter,
            image: product.images[0]
        }

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
        setColor(undefined);
        setNumber(undefined);
        setLetters(undefined);

        setShowConfetti(true);
        toast.success('Producto agregado al carrito');
        setTimeout(() => setShowConfetti(false), 4000);
    }

    return (
        <>
            {
                showConfetti && <Confetti />
            }

            {
                (product.colors?.some(item => item.trim() !== '')) && (
                    <ColorSelector
                        selectedColor={color}
                        availableColors={product.colors}
                        onColorChanged={setColor}
                    />
                )
            }

            {
                (product.sizes?.some(item => item.trim() !== '')) && (
                    <SizeSelector
                        selectedSize={size}
                        availableSizes={product.sizes}
                        onSizeChanged={setSize}
                    />
                )
            }

            {
                (product.numbers?.some(item => item.trim() !== '')) && (
                    <NumberSelector
                        selectedNumber={number}
                        availableNumbers={product.numbers}
                        onNumberChanged={setNumber}
                    />
                )
            }

            {
                product.letters && (
                    <LetterInput setLetters={setLetters} />
                )
            }

            <QuantitySelector
                inStock={product.inStock}
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

            {
                product.inStock === 0
                    ? (
                        <button disabled className="btn-disabled my-5 cursor-pointer" onClick={addToCart}>
                            Sin stock
                        </button>
                    )
                    : (
                        <>
                            <li className='mt-5 font-bold'>Llega entre {formattedStart} y el {formattedEnd}</li>
                            <li className='font-light'>Compras superiores a 70.000 envío gratis en Bogotá.</li>
                            <li className='font-light'>Compras realizadas antes de las 2 pm, llega el mismo día en Bogotá. (No aplica para domingos)</li>
                            <button className="btn-primary my-5 cursor-pointer" onClick={addToCart}>
                                Agregar al carrito
                            </button>
                        </>
                    )
            }

            <Toaster richColors position='bottom-right' />

        </>
    )
}
