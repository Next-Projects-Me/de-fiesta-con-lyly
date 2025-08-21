'use server';

import prisma from "@/lib/prisma";

export const getIvaPercent = async () => {

    try {
        const iva = await prisma.costs.findFirst({
            where: { name: "IVA" },
            orderBy: {
                name: 'asc'
            }
        });

        return iva!.price! * 0.01

    }
    catch {
        throw new Error('Error al obtener el IVA');
    }
}