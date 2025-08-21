'use server';

import prisma from "@/lib/prisma";

export const getActiveCategories = async () => {

    try {

        const categories = await prisma.category.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
                icon: true,
                Subcategory: {
                    where: { isActive: true },
                    select: {
                        id: true,
                        name: true
                    },
                    orderBy: {
                        name: 'asc'
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        return categories;

    }
    catch (error) {
        console.log(error);
        throw new Error('Error al obtener las categorías activas');
    }
}