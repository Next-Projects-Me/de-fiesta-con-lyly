'use server';

import prisma from "@/lib/prisma";

export const getAllCategories = async () => {

    try {

        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                icon: true,
                Subcategory: {
                    select: {
                        id: true,
                        name: true,
                        isActive: true,
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
        throw new Error('Error al obtener todas las categorías');
    }
}