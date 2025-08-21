'use server';

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

export const registerUser = async (name: string, email: string, password: string) => {

    try {

        const role = await prisma.role.findFirst({
            where: {
                id: 2
            },
            select: {
                id: true,
            }
        });

        if (!role) {
            return {
                ok: false,
                message: 'No existe el rol de usuario'
            }
        };

        const verifyEmail = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (verifyEmail) {
            return {
                ok: false,
                message: 'Ya hay un usuario registrado con ese correo'
            }
        }

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password),
                roleId: role.id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return {
            ok: true,
            user: user,
            message: 'Usuario Creado'
        }

    }
    catch (error) {

        if (error instanceof Error) {
            console.log(error.message);
            return {
                ok: false,
                message: error.message
            };
        }

        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }

}