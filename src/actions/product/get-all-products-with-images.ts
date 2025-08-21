'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
    subcategory?: number;
    searching?: string;
    isAdminPage: boolean
}


export const getAllProductsWithImages = async ({ page = 1, take = 50, subcategory = 0, searching, isAdminPage }: PaginationOptions) => {


    try {

        const session = await auth();
        if (isAdminPage && session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        if (isNaN(Number(page))) page = 1;
        if (page < 1) page = 1;

        if (isNaN(Number(take))) take = 50;
        if (take < 1) take = 50;

        const subcategoryValidation = subcategory == 0 ? undefined : subcategory;
        const products = await prisma.product.findMany({
            where: {
                ...(subcategoryValidation &&
                    { subcategoryId: parseInt(subcategory!.toString()) }
                ),
                ...(searching &&
                {
                    OR: [{ title: { contains: searching, mode: 'insensitive' } }]
                }),
            },
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        id: true,
                        url: true
                    }
                },
                subcategory: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            skip: (page - 1) * take,
            take: parseInt(take.toString()),
        });


        const totalCount = await prisma.product.count({
            where: {
                ...(subcategoryValidation &&
                    { subcategoryId: parseInt(subcategory!.toString()) }
                ),
                ...(searching &&
                {
                    OR: [{ title: { contains: searching, mode: 'insensitive' } }]
                }),
            },
        });

        const totalPages = Math.ceil(totalCount / take);

        return {
            ok: true,
            currentPages: 1,
            totalCount: totalCount,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                subcategory: product.subcategory.name,
                images: product.ProductImage.map(item => item.url)
            }))
        }

    }
    catch (error) {
        throw new Error(`No se pudo cargar los productos. ${error}`)
    }
}