'use server';

import prisma from "@/lib/prisma";

export const getSendingCost = async () => {

    try {
        const sending = await prisma.costs.findFirst({
            where: { name: "Envío" },
            orderBy: {
                name: 'asc'
            }
        });

        return sending?.price

    }
    catch {
        throw new Error('Error al obtener el costo del envío');
    }
}