import { initialData } from './seed';
import prisma from '../lib/prisma';
import { cities } from '../seed/seed-cities';
import { departments } from '../seed/seed-departments';
import { subcategories } from './seed-subcategories';

async function main() {

    // 1. Borrar registros nuevos
    await prisma.gender.deleteMany();
    await prisma.color.deleteMany();
    await prisma.size.deleteMany();

    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.subcategory.deleteMany();
    await prisma.category.deleteMany();

    await prisma.city.deleteMany();
    await prisma.department.deleteMany();

    // await Promise.all([
    //     prisma.productImage.deleteMany(),
    //     prisma.product.deleteMany(),
    //     prisma.category.deleteMany()
    // ]);

    const Seed = initialData;

    await prisma.gender.createMany({
        data: Seed.genders
    });

    await prisma.color.createMany({
        data: Seed.colors
    });

    await prisma.size.createMany({
        data: Seed.sizes
    });

    await prisma.role.createMany({
        data: Seed.roles,
    });

    await prisma.category.createMany({
        data: Seed.categories
    });

    await prisma.subcategory.createMany({
        data: subcategories
    })

    await prisma.user.createMany({
        data: Seed.users
    });

    // Productos
    Seed.products.forEach(async (product) => {

        const { images, ...rest } = product

        const dbProduct = await prisma.product.create({
            data: {
                ...rest
            }
        })

        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        });
    });

    // Departamentos
    await prisma.department.createMany({
        data: departments
    });

    // Ciudades
    cities.map(async (item) => {

        const detail = departments.find(x => x.name.includes(item.departamento));
        item.ciudades.map(async (city) => {

            await prisma.city.createMany({
                data: {
                    name: city,
                    departmentId: detail!.id
                }
            });
        });
    });
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();