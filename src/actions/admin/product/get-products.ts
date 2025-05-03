'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getAllProducts = async () => {

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

        const products = await prisma.product.findMany();

        if (!products) {
            return {
                ok: false,
                message: 'No se encontraron productos'
            }
        }

        return {
            ok: true,
            products: products,
        };
    }
    catch (error) {
        console.log(error);
        throw new Error('Error al obtener el stock por slug');
    }
}