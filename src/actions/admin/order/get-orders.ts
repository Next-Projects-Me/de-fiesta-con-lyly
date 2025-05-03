'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getAllOrders = async () => {

    try {

        const session = await auth();
        if (session?.user.role !== 'admin') {
            return {
                ok: false,
                message: 'Inicie sesión'
            }
        }


        if (session?.user.role !== 'admin') {
            return {
                ok: false,
                message: 'Usuario no autorizado'
            }
        }

        const orders = await prisma.order.findMany();

        if (!orders) {
            return {
                ok: false,
                message: 'No se encontraron productos'
            }
        }

        return {
            ok: true,
            orders: orders,
        };
    }
    catch (error) {
        console.log(error);
        throw new Error('Error al obtener el stock por slug');
    }
}