'use server';

import prisma from "@/lib/prisma";

export const getSubcategories = async () => {

    try {

        const subcategories = await prisma.subcategory.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc'
            }
        });

        return subcategories;

    }
    catch (error) {
        console.log(error);
        throw new Error('Error al obtener el stock por slug');
    }
}