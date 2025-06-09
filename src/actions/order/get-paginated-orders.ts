'use server';
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrders = async () => {

    try {
        const session = await auth();

        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'Debe de estar autenticado'
            }
        }

        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        });

        return {
            ok: true,
            orders: orders
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error al obtener las ordenes por usuario'
        }
    }

}