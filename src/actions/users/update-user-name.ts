'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateUserName = async (userName: string) => {

    try {

        const session = await auth();
        if (!session?.user) {
            return {
                ok: false,
                message: 'Debe estar autenticado'
            }
        }

        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                name: userName
            }
        });

        revalidatePath('/profile');

        return {
            ok: true
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar el nombre'
        }
    }
}

