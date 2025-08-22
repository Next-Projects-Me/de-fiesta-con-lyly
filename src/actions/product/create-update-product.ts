'use server';

import { Product } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
    id: z.coerce.number(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2))),
    inStock: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2))),
    subcategoryId: z.coerce.number(),
    sizes: z.coerce.string().transform(val => val.split(',').filter(s => s.trim() !== '')),
    colors: z.coerce.string().transform(val => val.split(',').filter(s => s.trim() !== '')),
    numbers: z.coerce.string().transform(val => val.split(',').filter(s => s.trim() !== '')),
    letters: z.coerce.string().transform(val => val === 'true'),
})


export const createUpdateProduct = async (formData: FormData) => {

    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
        console.log(productParsed.error);
        return { ok: false }
    }

    const product = productParsed.data;

    const { id, ...rest } = product;

    product.slug = product.slug.toLocaleLowerCase().replace(/ /g, '-').trim();

    try {
        const prismaTx = await prisma.$transaction(async () => {

            let product: Product;
            if (id) {
                product = await prisma.product.update({
                    where: { id },
                    data: {
                        ...rest,
                    }
                });

            } else {

                const lastId = await prisma.product.findFirst({
                    select: { id: true },
                    orderBy: { id: 'desc' }
                });

                product = await prisma.product.create({
                    data: {
                        id: lastId!.id + 1,
                        ...rest,
                    }
                })
            }

            if (formData.getAll('images')) {
                // const images = await uploadImagesToCloudinary(formData.getAll('images') as File[]);
                const images = await uploadImagesToBunny(formData.getAll('images') as File[]);
                if (!images) {
                    throw new Error('No se pudo cargar las imágenes, rollingBack ')
                }

                await prisma.productImage.createMany({
                    data: images.map(url => ({
                        url: url!,
                        productId: product.id
                    }))
                });
            }

            return {
                product
            }
        });

        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);

        return {
            ok: true,
            product: prismaTx.product
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar el producto'
        }
    }
}

const uploadImagesToBunny = async (images: File[]) => {

    try {

        const currentDate = new Date();
        const base = format(currentDate, "yyyyMMddHHmmssSSS");

        const uploadedUrls = [];

        const URLBase = process.env.BUNNY_BASE ?? "";
        const bunnyCND = process.env.BUNNY_CDN ?? "";
        const storageZoneName = process.env.BUNNY_ZONE_NAME ?? "";
        const storagePassword = process.env.BUNNY_ACCESS_KEY ?? "";

        for (const file of images) {

            const response = await fetch(`${URLBase}/${storageZoneName}/store/${base}_${file.name}`, {
                method: "PUT",
                headers: {
                    Accesskey: storagePassword,
                    "content-Type": "application/octet-stream",
                },
                body: file,
                cache: 'no-cache'
            });

            if (response.ok) {
                uploadedUrls.push(`${bunnyCND}/store/${base}_${file.name}`);
            } else {
                console.error("Upload failed for", file.name);
            }
        }

        return uploadedUrls;

    } catch (error) {
        console.log(error);
        return null;
    }
}


// const uploadImagesToCloudinary = async (images: File[]) => {

//     try {
//         const uploadPromises = images.map(async (image) => {

//             try {

//                 const buffer = await image.arrayBuffer();
//                 const base64Image = Buffer.from(buffer).toString('base64');

//                 return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
//                     .then(r => r.secure_url);
//             } catch (error) {
//                 console.log(error);
//                 return null;
//             }

//         });

//         const uploadedImages = await Promise.all(uploadPromises);
//         return uploadedImages;


//     } catch (error) {
//         console.log(error);
//         return null;
//     }

// }