'use client';

import { BoldCheckPayment } from "@/actions/payments/bold-check-payment";
import { getPaymentLink } from "@/actions/payments/get-payment-link";
import { setPaymentLink } from "@/actions/payments/set-payment-link";
import Image from "next/image";
import { useEffect } from "react";


interface Props {
    orderId: string;
    amount: number;
}

export const PaymentButton = ({ orderId, amount }: Props) => {

    const checkPayment = async () => {
        await BoldCheckPayment(orderId);
    }

    useEffect(() => {
        checkPayment();
    }, []);

    const onPayment = async () => {

        const response = await getPaymentLink(orderId, amount);
        if (response.paymentLink) {

            const { ok } = await setPaymentLink(orderId, response.paymentLink);
            if (!ok) {
                throw new Error('No se pudo actualizar el link de la orden');
            }

            window.location.replace(response.link);
        }
    }

    return (
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
    )
}
