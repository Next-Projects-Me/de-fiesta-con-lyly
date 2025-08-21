'use server';

import prisma from "@/lib/prisma";

export const getProductById = async (id: number) => {

    try {

        const product = await prisma.product.findFirst({
            include: {
                ProductImage: true,
                subcategory: {
                    select: {
                        name: true
                    }
                },
            },
            where: {
                id: id,
            },
        })

        if (!product) return null;

        return {
            ...product,
            subcategory: product.subcategory.name,
            images: product.ProductImage.map(item => item.url)
        }

    }
    catch (error) {
        console.log(error);
        throw new Error('Error al obtener producto por id');
    }
}