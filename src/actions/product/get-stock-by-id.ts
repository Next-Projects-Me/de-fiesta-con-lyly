'use server';

import prisma from "@/lib/prisma";

export const getStockById = async (id?: number): Promise<number> => {

    try {

        const stock = await prisma.product.findFirst({
            where: {
                id: id,
            },
            select: {
                inStock: true
            }
        });

        return stock?.inStock ?? 0;

    }
    catch (error) {
        console.log(error);
        throw new Error('Error al obtener el stock por slug');
    }
}