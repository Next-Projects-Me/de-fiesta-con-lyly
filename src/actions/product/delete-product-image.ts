'use server';

import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');


export const deleteProductImageCloudinary = async (imageId: number, imageUrl: string) => {


    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            error: 'No se pueden eliminar imágenes del file system'
        }
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';

    try {
        await cloudinary.uploader.destroy(imageName);
        const deletedImage = await prisma.productImage.delete({
            where: {
                id: imageId
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        });

        revalidatePath(`/admin/products`);
        revalidatePath(`/admin/product/${deletedImage.product.slug}`);
        revalidatePath(`/product/${deletedImage.product.slug}`);

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo eliminar la imagen'
        }
    }
}

export const deleteProductImageBunny = async (imageId: number, imageUrl: string) => {
    try {

        const imageName = imageUrl.split('/').pop();
        const URLBase = process.env.BUNNY_BASE ?? "";
        const storageZoneName = process.env.BUNNY_ZONE_NAME ?? "";
        const storagePassword = process.env.BUNNY_ACCESS_KEY ?? "";

        const response = await fetch(`${URLBase}/${storageZoneName}/store/${imageName}`, {
            method: "DELETE",
            headers: {
                Accesskey: storagePassword,
            },
        });

        if (response.ok) {
            const deletedImage = await prisma.productImage.delete({
                where: {
                    id: imageId
                },
                select: {
                    product: {
                        select: {
                            slug: true
                        }
                    }
                }
            });

            revalidatePath(`/admin/products`);
            revalidatePath(`/admin/product/${deletedImage.product.slug}`);
            revalidatePath(`/product/${deletedImage.product.slug}`);
        }


    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo eliminar la imagen'
        }
    }
}