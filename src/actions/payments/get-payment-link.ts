'use server';

import { BoldRequest } from "@/interfaces/boldRequest.interface";
import { BoldResponse } from "@/interfaces/boldResponse.interface";

export const getPaymentLink = async (orderId: string, amount: number) => {

    const publicUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
    const redirectUrl = `${publicUrl}/orders/${orderId}`;

    const totalSelling: BoldRequest = {
        amount_type: "CLOSE",
        amount: {
            currency: "COP",
            total_amount: amount,
            tip_amount: 0
        },
        expiration_date: getExpirationDate(),
        callback_url: redirectUrl
    }

    const apiBase = process.env.BOLD_API_BASE;
    const apiGenerationLink = apiBase + "/online/link/v1";
    const identityKey = process.env.BOLD_API_IDENTITY_KEY;

    const options = {
        method: 'POST',
        headers: {
            Authorization: `x-api-key ${identityKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(totalSelling)
    };


    try {

        const response: BoldResponse = await fetch(apiGenerationLink, { ...options, cache: 'no-store' }).then(r => r.json());
        if (response.errors.length > 0) {
            return {
                ok: false,
                message: response.errors
            }
        }

        return {
            ok: true,
            link: response.payload.url,
            paymentLink: response.payload.payment_link
        }


    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se puedo obtener el link de pago'
        }
    }
}

const getExpirationDate = () => {
    const currentNanoseconds = Date.now() * 1e6;
    const tenMinutesInNanoseconds = 10 * 60 * 1e9;
    const futureNanoseconds = currentNanoseconds + tenMinutesInNanoseconds;

    return futureNanoseconds;
}