'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getSizes = async () => {

    try {

        const session = await auth();
        if (session?.user.roleId !== 1) {
            return;
        }
        const sizes = await prisma.size.findMany();
        return sizes;

    }
    catch (error) {
        console.log(error);
        throw new Error('Error al obtener el stock por slug');
    }
}