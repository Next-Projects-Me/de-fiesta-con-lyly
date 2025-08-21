'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteSize = async (id: number, size: string) => {

    try {
        const session = await auth();
        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        await prisma.size.delete({
            where: { id }
        });

        revalidatePath('/admin/features');
        revalidatePath('/');

        return {
            ok: true,
            message: `La talla ${size} ha sido eliminado correctamente`
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
        throw new Error('Error al eliminar la talla');
    }
}