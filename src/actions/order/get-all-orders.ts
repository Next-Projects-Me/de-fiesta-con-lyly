'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { parseBoolean } from "@/utils/parseBoolean";
import { endOfDay, startOfDay } from "date-fns";

interface PaginationOptions {
    page?: number;
    take?: number;
    searching?: string;
    isPaid?: string;
    startDate?: Date;
    endDate?: Date;
    isAdminPage: boolean
}

export const getAllOrders = async ({
    page = 1, take = 30, searching, isPaid,
    startDate = startOfDay(new Date()), endDate = endOfDay(new Date()),
    isAdminPage
}: PaginationOptions) => {

    try {

        const session = await auth();
        if (!session?.user) {
            return {
                ok: false,
                message: 'Debe de estar autenticado'
            }
        }

        if (isAdminPage && session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        if (isNaN(Number(page))) page = 1;
        if (page < 1) page = 1;

        if (isNaN(Number(take))) take = 30;
        if (take < 1) take = 30;

        const orders = await prisma.order.findMany({
            where: {
                ...(!isAdminPage && {
                    userId: session?.user.id,
                }),
                ...(isPaid && {
                    isPaid: parseBoolean(isPaid)
                }),
                ...(searching && {
                    OR: [
                        { code: { contains: searching.trim(), mode: 'insensitive' } },
                        {
                            OrderAddress: {
                                OR: [
                                    { firstName: { contains: searching.trim(), mode: 'insensitive' }, },
                                    { lastName: { contains: searching.trim(), mode: 'insensitive' }, }
                                ]
                            },
                        }
                    ]
                }),
                ...(startDate &&
                    endDate && {
                    createdAt: {
                        gte: startOfDay(startDate),
                        lte: endOfDay(endDate),
                    },
                }),
            },
            select: {
                id: true,
                code: true,
                createdAt: true,
                isPaid: true,
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true,
                        phone: true,
                        address: true,
                        city: true
                    }
                },
                OrderItem: {
                    select: {
                        product: {
                            select: {
                                ProductImage: {
                                    select: { url: true }
                                }
                            }
                        }
                    }
                }
            },
            skip: (page - 1) * take,
            take: parseInt(take.toString()),
            orderBy: {
                createdAt: 'desc'
            },
        });

        const totalCount = await prisma.order.count({
            where: {
                ...(!isAdminPage && {
                    userId: session?.user.id,
                }),
                ...(isPaid && {
                    isPaid: parseBoolean(isPaid)
                }),
                ...(searching && {
                    OR: [
                        { code: { contains: searching, mode: 'insensitive' } },
                        {
                            OrderAddress: {
                                OR: [
                                    { firstName: { contains: searching, mode: 'insensitive' }, },
                                    { lastName: { contains: searching, mode: 'insensitive' }, }
                                ]
                            },
                        }
                    ]
                }),
                ...(startDate &&
                    endDate && {
                    createdAt: {
                        gte: startOfDay(startDate),
                        lte: endOfDay(endDate),
                    },
                }),

            },
        });

        const totalPages = Math.ceil(totalCount / take);

        return {
            ok: true,
            currentPages: 1,
            totalCount: totalCount,
            totalPages: totalPages,
            orders: orders
        }

    }
    catch (error) {
        throw new Error(`No se pudo cargar las ordenes. ${error}`)
    }
}

