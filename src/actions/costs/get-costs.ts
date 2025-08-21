'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getCosts = async () => {

    try {
        const session = await auth();
        if (session?.user.roleId !== 1) {
            return;
        }

        const costs = await prisma.costs.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return costs

    }
    catch {
        throw new Error('Error al obtener todos los costos');
    }
}