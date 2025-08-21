'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createSubcategory = async (categoryId: number, name: string) => {

    try {

        const session = await auth();
        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        const existSub = await prisma.subcategory.findFirst({
            where: { name, categoryId },
            select: { id: true },
            orderBy: { id: 'desc' }
        });

        if (existSub) {
            return {
                ok: false,
                message: 'Ya existe una sub-categoría con ese nombre para esa categoría'
            }
        }

        const lastId = await prisma.subcategory.findFirst({
            select: { id: true },
            orderBy: { id: 'desc' }
        });

        await prisma.subcategory.create({
            data: {
                id: lastId!.id + 1,
                name: name,
                categoryId: categoryId
            },
        });

        revalidatePath('/admin/features');
        revalidatePath('/');

        return {
            ok: true,
            message: 'La sub-categoría ha sido creada con éxito.'
        };

    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return {
                ok: false,
                message: error.message
            };
        }
        throw new Error('Error al crear la sub-categoría');
    }
}