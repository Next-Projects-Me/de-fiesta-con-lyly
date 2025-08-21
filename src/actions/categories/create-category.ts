'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createCategory = async (name: string, icon: number) => {

    try {

        const session = await auth();
        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        const existCat = await prisma.category.findFirst({
            where: { name },
            select: { id: true },
            orderBy: { id: 'desc' }
        });

        if (existCat) {
            return {
                ok: false,
                message: 'Ya existe una categoría con ese nombre'
            }
        }

        const lastId = await prisma.category.findFirst({
            select: { id: true },
            orderBy: { id: 'desc' }
        });

        await prisma.category.create({
            data: {
                id: lastId!.id + 1,
                name: name,
                icon: icon,
            },
        });

        revalidatePath('/admin/features');
        revalidatePath('/');

        return {
            ok: true,
            message: 'La categoría ha sido creada con éxito.'
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
        throw new Error('Error al crear la categoría');
    }
}