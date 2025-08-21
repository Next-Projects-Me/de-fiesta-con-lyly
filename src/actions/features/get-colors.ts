'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getColors = async () => {

    try {
        const session = await auth();
        if (session?.user.roleId !== 1) {
            return;
        }
        const colors = await prisma.color.findMany();
        return colors;
    }
    catch (error) {
        console.log(error);
        throw new Error('Error al obtener el stock por slug');
    }
}