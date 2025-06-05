'use server';

import prisma from "@/lib/prisma";

export const getCitiesByDepartment = async (departmentId: string) => {

    try {
        const cities = await prisma.city.findMany({
            where: {
                departmentId: departmentId
            },
            orderBy: {
                name: 'asc'
            }
        });

        return cities;

    }
    catch (error) {
        console.log(error);
        return [];
    }
}

