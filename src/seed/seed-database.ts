import { initialData } from "./seed";
import prisma from '../lib/prisma';
import { countries } from './seed-countries';

async function main() {

    // 1. Borrar registros nuevos

    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.country.deleteMany();
    // await Promise.all([
    //     prisma.productImage.deleteMany(),
    //     prisma.product.deleteMany(),
    //     prisma.category.deleteMany()
    // ]);


    const { categories, products, users } = initialData;

    await prisma.user.createMany({
        data: users
    });

    // Categorias
    const categoriesData = categories.map((name) => ({ name }));

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>)

    // Productos
    products.forEach(async (product) => {
        const { type, images, ...rest } = product

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // Images        
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        });
    })

    //Ciudades   
    await prisma.country.createMany({
        data: countries
    });

}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();