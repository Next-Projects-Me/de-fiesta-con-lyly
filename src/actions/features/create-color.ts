'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createColor = async (color: string) => {

    try {
        const session = await auth();
        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        const existColor = await prisma.color.findFirst({
            where: { name: color }
        })

        if (existColor) {
            return {
                ok: false,
                message: 'Ese color ya existe'
            }
        }

        await prisma.color.create({
            data: {
                name: color,
            }
        });

        revalidatePath('/admin/features');
        revalidatePath('/');

        return {
            ok: true,
            message: `El color ${color} ha sido insertado correctamente`
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
        throw new Error('Error al insertar el color');
    }
}