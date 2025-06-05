'use server';

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {

    try {

        const address = await prisma.userAddress.findUnique({
            where: { userId: userId }
        });

        if (!address) return null;

        const { id, address2, userId: user, ...rest } = address;

        return {
            ...rest,
            address2: address2 ? address2 : '',
        };

    } catch (error) {
        console.log(error);
        return null;
    }
}