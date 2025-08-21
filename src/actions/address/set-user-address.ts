'use server';

import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import type { Address } from "@/interfaces/address.interface";

export const setUserAddress = async (address: Address) => {

    try {

        const session = await auth();
        if (!session?.user) {
            return {
                ok: false,
                message: 'Debe estar autenticado'
            }
        }

        const newAddress = await createOrReplaceAddress(address, session.user.id);

        revalidatePath('/profile');

        return {
            ok: true,
            address: newAddress
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo grabar la dirección'
        }
    }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {

    try {
        const storeAddress = await prisma.userAddress.findUnique({
            where: { userId }
        });

        const addressToSave = {
            address: address.address,
            address2: address.address2,
            departmentId: parseInt(address.departmentId.toString()),
            cityId: parseInt(address.cityId.toString()),
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            document: address.document
        }

        if (!storeAddress) {
            const newAddress = await prisma.userAddress.create({
                data: {
                    ...addressToSave,
                    userId: userId,
                }
            });

            return newAddress;
        }

        const updatedAddress = await prisma.userAddress.update({
            where: { userId },
            data: addressToSave
        });

        return updatedAddress;

    } catch (error) {
        console.log(error);
        throw new Error('No se pudo grabar la dirección');
    }
}