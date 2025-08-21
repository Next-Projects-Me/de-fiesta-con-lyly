'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createSize = async (size: string) => {

    try {
        const session = await auth();
        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        const existSize = await prisma.size.findFirst({
            where: { name: size }
        })

        if (existSize) {
            return {
                ok: false,
                message: 'Esa talla ya existe'
            }
        }

        await prisma.size.create({
            data: { name: size }
        });

        revalidatePath('/admin/features');
        revalidatePath('/');

        return {
            ok: true,
            message: `La talla ${size} ha sido insertado correctamente`
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
        throw new Error('Error al insertar la talla');
    }
}