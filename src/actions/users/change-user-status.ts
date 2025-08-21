'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const changeUserStatus = async (userId: string, status: boolean) => {


    try {

        const session = await auth();

        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'Debe de estar autenticado como administrador'
            }
        }

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                isActive: !status
            }
        });

        return {
            ok: true,
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar el estado, revisar logs'
        }
    }
}