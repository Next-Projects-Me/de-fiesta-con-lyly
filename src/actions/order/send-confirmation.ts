'use server';

import { auth } from "@/auth.config";
import { sendEmailOrderConfirmation, sendEmailOrderConfirmationAdmin } from "@/lib/brevo";
import prisma from "@/lib/prisma";

export const sendOrderConfirmation = async (link: string, code: string) => {

    try {

        const session = await auth();

        if (!session?.user) {
            return {
                ok: false,
                message: 'Debe estar autenticado'
            }
        }

        sendEmailOrderConfirmation({
            email: session?.user.email,
            name: session?.user.name,
            link: link,
            code: code
        });

        const order = await prisma.order.findFirst({
            where: { code },
            include: {
                OrderAddress: true
            }
        });

        sendEmailOrderConfirmationAdmin({
            email: session?.user.email,
            name: session?.user.name,
            link: link,
            code: code,
            order: {
                id: order!.id,
                code: order!.code,
                isPaid: order!.isPaid,
                createdAt: order!.createdAt,
                total: order!.total,
                OrderAddress: order!.OrderAddress
            }
        });

        return {
            ok: true,
            message: "Los correos se enviaron con éxito"
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error al obtener datos de la orden"
        }
    }
}