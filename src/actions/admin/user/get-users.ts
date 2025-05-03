'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getAllUsers = async () => {

    try {

        const session = await auth();
        if (session?.user.role !== 'admin') {
            return {
                ok: false,
                message: 'Inicie sesión'
            }
        }

        if (session?.user.role !== 'admin') {
            return {
                ok: false,
                message: 'Usuario no autorizado'
            }
        }

        const users = await prisma.user.findMany();

        if (!users) {
            return {
                ok: false,
                message: 'No se encontraron usuarios'
            }
        }

        return {
            ok: true,
            users: users,
        };
    }
    catch (error) {
        console.log(error);
        throw new Error('Error al obtener el stock por slug');
    }
}