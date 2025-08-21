'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateCategory = async (id: number, name: string, icon: number) => {

    try {
        const session = await auth();
        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        await prisma.category.update({
            data: { name, icon },
            where: { id }
        });

        revalidatePath('/admin/features');
        revalidatePath('/');

        return {
            ok: true,
            message: `La categoría '${name}' ha sido actualizada con éxito`
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
        throw new Error('Error al actualizar las sub-categorías');
    }
}