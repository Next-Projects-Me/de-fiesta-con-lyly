'use server';

import type { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {

    try {

        const newAddress = await createOrReplaceAddress(address, userId);

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
            departmentId: address.departmentId,
            cityId: parseInt(address.cityId.toString()),
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
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