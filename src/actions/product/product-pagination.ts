'use server';

import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
    categoryId?: number
}


export const getPaginatedProductsWithImages = async ({ page = 1, take = 50, categoryId }: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    if (isNaN(Number(take))) take = 50;
    if (take < 1) take = 50;

    try {

        if (categoryId) categoryId = parseInt(categoryId.toString())

        // 1. Obtener los productos
        const products = await prisma.product.findMany({
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            skip: (page - 1) * take,
            take: take,
            where: {
                categoryId: categoryId
            }
        });

        // 2. Obtener el total de páginas
        const totalCount = await prisma.product.count({
            where: {
                categoryId: categoryId
            }
        });

        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPages: 1,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                category: product.category.name,
                images: product.ProductImage.map(item => item.url)
            }))
        }

    }
    catch (error) {
        throw new Error(`No se pudo cargar los productos. ${error}`)
    }
}