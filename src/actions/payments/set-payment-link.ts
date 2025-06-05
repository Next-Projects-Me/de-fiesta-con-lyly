'use server';

import prisma from "@/lib/prisma";

export const setPaymentLink = async (orderId: string, paymentLink: string) => {

    try {

        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                paymentLink: paymentLink
            }
        });

        if (!order) {
            return {
                ok: false,
                message: `No se encontró una orden con el id ${orderId}`
            }
        }

        return { ok: true }

    } catch {
        return {
            ok: false,
            message: 'No se puedo actualizar el id de la transacción'
        }
    }

}