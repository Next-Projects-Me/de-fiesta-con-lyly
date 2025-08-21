'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { parseBoolean } from "@/utils/parseBoolean";

interface PaginationOptions {
    page?: number;
    take?: number;
    rol?: number;
    status?: string;
    searching?: string;
}


export const getAllUsers = async ({ page = 1, take = 30, rol = 0, status, searching }: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    if (isNaN(Number(take))) take = 30;
    if (take < 1) take = 30;

    try {

        const session = await auth();

        if (session?.user.roleId !== 1) {
            return {
                ok: false,
                message: 'Debe de estar autenticado como administrador'
            }
        }

        const users = await prisma.user.findMany({
            where: {
                ...(rol > 0 && {
                    roleId: parseInt(rol.toString())
                }),
                ...(status && {
                    isActive: parseBoolean(status)
                }),
                ...(searching && {
                    OR: [
                        { id: { contains: searching, mode: 'insensitive' } },
                        { email: { contains: searching, mode: 'insensitive' }, },
                        { name: { contains: searching, mode: 'insensitive' }, }
                    ]
                }),
            },
            skip: (page - 1) * take,
            take: parseInt(take.toString()),
            orderBy: {
                name: 'desc'
            },
        });

        const totalCount = await prisma.user.count({
            where: {
                ...(rol > 0 && {
                    roleId: parseInt(rol.toString())
                }),
                ...(status && {
                    isActive: parseBoolean(status)
                }),
                ...(searching && {
                    OR: [
                        { id: { contains: searching, mode: 'insensitive' } },
                        { email: { contains: searching, mode: 'insensitive' }, },
                        { name: { contains: searching, mode: 'insensitive' }, }
                    ]
                }),
            }
        });

        const totalPages = Math.ceil(totalCount / take);

        return {
            ok: true,
            currentPages: 1,
            totalCount: totalCount,
            totalPages: totalPages,
            users: users
        }

    }
    catch (error) {
        throw new Error(`No se pudo cargar los productos. ${error}`)
    }
}