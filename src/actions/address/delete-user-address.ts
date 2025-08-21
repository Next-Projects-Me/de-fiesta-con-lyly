'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const deleteUserAddress = async () => {
    try {

        const session = await auth();
        if (!session?.user) {
            return {
                ok: false,
                message: 'Debe estar autenticado'
            }
        }

        const userAddress = await prisma.userAddress.findUnique({
            where: { id: parseInt(session.user.id) }
        });

        if (!userAddress) {
            return {
                ok: false,
                message: 'No se encontró la dirección'
            }
        }

        await prisma.userAddress.delete({
            where: { id: parseInt(session.user.id) }
        });

        return {
            ok: true,
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo eliminar la dirección'
        }
    }
}