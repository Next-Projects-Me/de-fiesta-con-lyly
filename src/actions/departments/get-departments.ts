'use server';

import prisma from "@/lib/prisma";

export const getDepartments = async () => {
    try {
        const departments = await prisma.department.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return departments;

    }
    catch (error) {
        console.log(error);
        return [];
    }
}