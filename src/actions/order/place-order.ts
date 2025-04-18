'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import type { Address } from "@/interfaces/address.interface";
import type { Size } from "@/interfaces/product.interface";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productsIds: ProductToOrder[], address: Address) => {

    // console.log({ productsIds })

    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productsIds.map(p => p.productId)
            }
        }
    });

    const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);

    const { subTotal, tax, total } = productsIds.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(product => product.id === item.productId);

        if (!product) {
            throw new Error(`${item.productId} no existe - 500`);
        }

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;

    }, { subTotal: 0, tax: 0, total: 0 })

    try {

        const prismaTx = await prisma.$transaction(async (tx) => {

            // 1. Actualizar el stock de los productos.
            const updatedProductPromises = products.map(async (product) => {

                const productQuantity = productsIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0);

                if (productQuantity === 0) {
                    throw new Error(`${product.id} no tiene cantidad definida`);
                }

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        // inStock: product.inStock - productQuantity
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                });
            });

            const updatedProducts = await Promise.all(updatedProductPromises);

            updatedProducts.forEach(product => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} no tiene inventario suficiente`)
                }
            });

            // 2. Crear la orden - Encabezado.
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
                    OrderItem: {
                        createMany: {
                            data: productsIds.map((p) => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price:
                                    products.find((product) => product.id === p.productId)
                                        ?.price ?? 0,
                            })),
                        },
                    },
                },
            });

            // Validar si el valor es cero

            // 3. Crear la dirección de la orden
            const { country, ...restAddress } = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id
                }
            });

            return {
                order: order,
                orderAddress: orderAddress,
                updatedProducts: [],
            }
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx
        }

    } catch (error: any) {
        console.log(error);
        return {
            ok: false,
            message: error?.message,
        }
    }
}