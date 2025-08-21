'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, roleId: number) => {

    const session = await auth();

    if (session?.user.roleId !== 1) {
        return {
            ok: false,
            message: 'Debe de estar autenticado como admin'
        }
    }

    try {

        // const newRole = role === 'admin' ? 'admin' : 'user';

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                roleId: parseInt(roleId.toString())
            }
        });

        revalidatePath('/admin/users');

        return {
            ok: true
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar el role, revisar logs'
        }
    }
}