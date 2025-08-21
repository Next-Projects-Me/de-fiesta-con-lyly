'use client';

import { currencyFormat } from '@/utils/currencyFormat';
import { LoadingSpinner } from '@/components/ui/loading-spinner/Loading';
import { placeOrder } from '@/actions/order/place-order';
import { toast, Toaster } from 'sonner';
import { useAddressStore } from '@/store/address/address-store';
import { useCartStore } from '@/store/cart/cart-store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
    iva: number;
    sending: number;
}

export const PlaceOrder = ({ iva, sending }: Props) => {

    const router = useRouter();
    const [loadingPage, setLoadingPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const address = useAddressStore(state => state.address);
    const { getSummaryInformation } = useCartStore();
    const { itemsInCart, subTotal, tax, total, sendingCost } = getSummaryInformation(iva, sending, address.city);
    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        setLoadingPage(true);
    }, []);

    const onPlaceOrder = async () => {

        setLoading(true);
        setIsPlacingOrder(true);

        const productsToOrder = cart.map(product => ({
            name: product.title,
            productId: product.id,
            quantity: product.quantity,
            size: product?.size,
            number: product?.number,
            color: product?.color,
            letter: product?.letter
        }));

        const resp = await placeOrder(productsToOrder, address);
        if (!resp.ok) {
            setLoading(false);
            setIsPlacingOrder(false);
            toast.error(resp.message as string);
            return;
        }

        clearCart();

        toast.success(`Orden N°${resp.order?.code} ha sido creada correctamente`);

        setTimeout(() => {
            router.replace('/orders/' + resp.order?.code);
        }, 2000);
    }

    if (!loadingPage) {
        return <LoadingSpinner />
    }

    return (
        <div className="">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10" >
                <p className="text-2xl font-bold">{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.city} - {address.department}</p>
                <p>{address.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">
                    {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
                </span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Impuestos ({iva * 100}%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>

                <span className="mt-5">Envío</span>
                <span className="mt-5 text-right">{sendingCost > 0 ? currencyFormat(sendingCost) : "Gratis"}</span>
                <span className="mt-1 text-2xl">Total: </span>
                <span className="mt-1 text-2xl text-right">{currencyFormat(total)}</span>
            </div>

            <Toaster richColors position='bottom-right' />

            <div className="mt-5 mb-2 w-full">
                <p className="mb-5">
                    {/* Disclaimer */}
                    <span className="text-xs">
                        Al hacer clic en &quot;Generar orden&quot;, acepta nuestros
                        <Link href="/politics/terms" className="underline"> términos y condiciones</Link> y
                        <Link href="/politics/data" className="underline"> políticas de tratamiento de datos</Link>
                    </span>
                </p>

                {
                    loading && <LoadingSpinner message='Generando orden...' />
                }

                {
                    !loading &&
                    <button
                        // href="/orders/123"
                        onClick={onPlaceOrder}
                        className={
                            clsx(
                                'w-full cursor-pointer',
                                {
                                    'btn-primary': !isPlacingOrder,
                                    'btn-disabled': isPlacingOrder
                                })
                        }
                    >
                        Generar orden
                    </button>
                }

            </div>
        </div>
    )
}
