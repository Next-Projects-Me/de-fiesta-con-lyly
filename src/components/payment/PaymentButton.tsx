'use client';

import { BoldCheckPayment } from "@/actions/payments/bold-check-payment";
import { getPaymentLink } from "@/actions/payments/get-payment-link";
import { LoadingSpinner } from "../ui/loading-spinner/Loading";
import { sendOrderConfirmation } from "@/actions/order/send-confirmation";
import { setPaymentLink } from "@/actions/payments/set-payment-link";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface Props {
    orderId: number;
    orderCode: string;
    amount: number;
}

export const PaymentButton = ({ orderId, orderCode, amount }: Props) => {

    const [Loading, setLoading] = useState(false)

    const publicUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
    const redirectUrl = `${publicUrl}/orders/${orderCode}`;

    const checkPayment = useCallback(async () => {
        const { ok } = await BoldCheckPayment(orderId);
        if (ok) {
            await sendOrderConfirmation(redirectUrl, orderCode);
        }
    }, [orderId, redirectUrl, orderCode])

    useEffect(() => {
        checkPayment();
    }, [checkPayment]);

    const onPayment = async () => {

        setLoading(true);

        const response = await getPaymentLink(redirectUrl, amount);
        if (response.paymentLink) {

            const { ok } = await setPaymentLink(orderId, response.paymentLink);
            if (!ok) {
                throw new Error('No se pudo actualizar el link de la orden');
            }

            setTimeout(() => {
                window.location.replace(response.link);
            }, 2000);
        }
    }

    return (
        <>
            {
                Loading && <LoadingSpinner message="Conectando con Bold..." />
            }
            {
                !Loading &&
                <>
                    <button onClick={onPayment} className="btn-primary w-full cursor-pointer">
                        Pagar
                    </button>
                    <div className="flex flex-wrap flex-row gap-3 mt-3 items-center justify-center">
                        <Image width={40} height={40} className="object-contain" src="/imgs/payments/American_express_icon.png" alt="American Express" />
                        <Image width={40} height={40} src="/imgs/payments/MasterCard_icon.png" alt="Mastercard" />
                        <Image width={40} height={40} src="/imgs/payments/Visa_icon.png" alt="Visa" />
                        <Image width={60} height={40} src="/imgs/payments/Codensa_icon.png" alt="Codensa" />
                        <Image width={40} height={40} src="/imgs/payments/Diners_club_icon.png" alt="Diners Club" />
                        <Image width={40} height={40} src="/imgs/payments/Discover_icon.png" alt="Discover" />
                        <Image width={60} height={60} src="/imgs/payments/pse_icon.png" alt="PSE" />
                    </div>
                </>
            }
        </>
    )
}
