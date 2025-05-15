'use server';

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

export const registerUser = async (name: string, email: string, password: string) => {

    try {

        const role = await prisma.role.findFirst({
            where: {
                role: 'user'
            },
            select: {
                id: true,
            }
        });

        if (!role) {
            return {
                ok: true,
                message: 'No existe el rol de usuario'
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

        console.log(error);
        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }

}