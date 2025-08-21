'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateCosts = async (id: number, price: number) => {

    try {
        const session = await auth();
        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'El usuario debe ser administrador'
            }
        }

        await prisma.costs.update({
            where: { id },
            data: { price: parseInt(price.toString()) }
        });

        revalidatePath('/orders');
        revalidatePath('/checkout');
        revalidatePath('/cart');
        revalidatePath('/admin/features');
        revalidatePath('/');

        return {
            ok: true,
            message: `Los costos han sido actualizado correctamente`
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
        throw new Error(`Error al actualizar el costo`);
    }
}