'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateSubcategory = async (id: number, name: string, isActive: boolean) => {

    try {

        const session = await auth();
        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        await prisma.subcategory.update({
            data: { name, isActive },
            where: { id }
        });

        revalidatePath('/admin/features');
        revalidatePath('/');

        return {
            ok: true,
            message: `La sub-categoría '${name}' ha sido actualizada con éxito`
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