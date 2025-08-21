"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner/Loading";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { useEffect, useState } from "react";

interface Props {
    iva: number;
    sending: number;
}

export const OrderSummary = ({ iva, sending }: Props) => {

    const [loaded, setLoaded] = useState(false);
    const { getSummaryInformation } = useCartStore()
    const { itemsInCart, subTotal, tax, total, sendingCost } = getSummaryInformation(iva, sending);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) return <LoadingSpinner />;

    return (
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
            <span className="mt-5 text-right">{currencyFormat(sendingCost)}</span>
            <span className="mt-1 text-2xl">Total: </span>
            <span className="mt-1 text-2xl text-right">{currencyFormat(total)}</span>
        </div>
    )
}
