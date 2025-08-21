'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderByCode = async (code: string) => {

    try {

        const session = await auth();

        if (!session?.user) {
            return {
                ok: false,
                message: 'Debe estar autenticado'
            }
        }

        const order = await prisma.order.findUnique({
            where: { code },
            include: {
                OrderAddress: {
                    include: {
                        city: true,
                        department: true,
                    }
                },
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        sizes: true,
                        colors: true,
                        genders: true,
                        numbers: true,
                        letters: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                },
            },
        });

        if (!order) throw `orden #${code} no existe`;

        if (session.user.roleId !== 1) {
            if (session.user.id !== order.userId) {
                throw `orden ${code} no es de ese usuario`
            }
        }

        return {
            ok: true,
            order: order
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error al obtener datos de la orden"
        }
    }
}