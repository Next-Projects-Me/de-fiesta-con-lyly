'use server';

import prisma from "@/lib/prisma";

export const getSizes = async () => {

    try {

        const sizes = await prisma.size.findMany();
        return sizes;

    }
    catch (error) {
        console.log(error);
        throw new Error('Error al obtener el stock por slug');
    }
}