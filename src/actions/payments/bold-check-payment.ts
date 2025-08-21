'use server';

import { BoldPaymentDetails } from "@/interfaces/boldPaymentDetails.interface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export const BoldCheckPayment = async (orderId: number) => {

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: { paymentLink: true }
    })

    if (!order?.paymentLink) {
        return {
            ok: false,
            message: 'No se pudo obtener el link de pago para la verificación'
        }
    }

    const response = await verifyBoldPayment(order?.paymentLink);
    if (!response) {
        return {
            ok: false,
            message: 'Error al verificar el pago'
        }
    }

    const { status } = response;

    if (status !== 'PAID') {
        return {
            ok: false,
            message: 'Aún no se ha pagado en Bold'
        }
    }

    try {

        await prisma.order.update({
            where: { id: orderId },
            data: {
                isPaid: true,
                paidAt: new Date(),
            }
        })

        revalidatePath(`/orders/${orderId}`)

        return {
            ok: true,
            message: 'Orden actualizada con éxito'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se logró validar el pago'
        }
    }
}

const verifyBoldPayment = async (paymentLink: string): Promise<BoldPaymentDetails | null> => {

    const apiBase = process.env.BOLD_API_BASE;
    const apiGenerationLink = apiBase + "/online/link/v1/" + paymentLink;
    const identityKey = process.env.BOLD_API_IDENTITY_KEY;

    const options = {
        method: 'GET',
        headers: { Authorization: `x-api-key ${identityKey}` }
    };

    try {

        const response: BoldPaymentDetails = await fetch(apiGenerationLink, { ...options, cache: 'no-store' }).then(r => r.json());
        return response;

    } catch (error) {
        console.log(error);
        return null
    }
}