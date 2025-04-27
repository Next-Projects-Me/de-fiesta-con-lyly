'use server';

import { sendEmail } from "@/lib/brevo";
import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export const recoveryPassword = async (email: string) => {

    try {

        const user = await prisma.user.findFirst({
            where: {
                email: email.toLowerCase(),
                google: false
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        if (!user) {
            return {
                ok: false,
                message: 'Ese correo no se encuentra registrado'
            }
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '5m' })
        const link = `${process.env.NEXT_PUBLIC_APP_URL}/auth/change-password/?token=${token}`;

        const userCrypt = {
            name: user?.name,
            email: user?.email,
            link: link
        }

        sendEmail(userCrypt);

        return {
            ok: true,
            user: userCrypt,
            message: 'Correo de recuperación enviado'
        }

    }
    catch (error) {

        console.log(error);
        return {
            ok: false,
            message: 'No se pudo encontrar el usuario'
        }
    }
}


export const changePassword = async (token: string, newPassword: string, confirmedPassword: string) => {

    try {

        if (newPassword != confirmedPassword) {
            return {
                ok: false,
                message: 'Las contraseñas deben coincidir'
            }
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        await prisma.user.update({
            where: {
                id: payload.userId!,
            },
            data: {
                password: bcryptjs.hashSync(confirmedPassword)
            }
        });

        return {
            ok: true,
            message: 'Contraseña se ha restablecido correctamente'
        }

    }
    catch (error) {

        if (error instanceof TokenExpiredError) {
            return {
                ok: false,
                message: 'La sesión ha expirado, vuelva a enviar el correo de recuperación.'
            }
        }

        return {
            ok: false,
            message: 'No se pudo restablecer contraseña.'
        }
    }
}