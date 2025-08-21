'use server';

import { auth } from "@/auth.config";
import { getIvaPercent } from "../costs/get-iva-percent";
import { getSendingCost } from "../costs/get-sending-price";
import { getStockById } from "../product/get-stock-by-id";
import prisma from "@/lib/prisma";
import type { Address } from "@/interfaces/address.interface";

interface ProductToOrder {
    name: string;
    productId: number;
    quantity: number;
    size?: string;
    color?: string;
    number?: string;
    letter?: string;
}

export const placeOrder = async (productsIds: ProductToOrder[], address: Address) => {

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

    for (const product of productsIds) {
        const inStock = await getStockById(product.productId);
        if (inStock === 0) {
            return {
                ok: false,
                message: `Ya no hay unidades disponibles del producto ${product.name}`,
            };
        }
    }

    const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);
    const iva = await getIvaPercent();

    const { subTotal, tax, total } = productsIds.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(product => product.id === item.productId);

        if (!product) {
            throw new Error(`${item.productId} no existe - 500`);
        }

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * iva;
        totals.total += (subTotal * (iva + 1));
        return totals;

    }, { subTotal: 0, tax: 0, total: 0 });

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
            const bogotaCity = await tx.city.findFirst({
                where: { name: "Bogotá" },
                select: { id: true }
            });

            let sendingCost = await getSendingCost();
            if (address.cityId == bogotaCity?.id) {
                sendingCost = (subTotal > 70000) ? 0 : sendingCost;
            }

            const order = await tx.order.create({
                data: {
                    code: "",
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    sendingCost: sendingCost!,
                    total: total + sendingCost!,
                    OrderItem: {
                        createMany: {
                            data: productsIds.map((p) => ({
                                quantity: p.quantity,
                                sizes: p.size,
                                numbers: p.number,
                                colors: p.color,
                                letters: p.letter,
                                productId: p.productId,
                                price:
                                    products.find((product) => product.id === p.productId)
                                        ?.price ?? 0,
                            })),
                        },
                    },
                },
            });

            // 2.1. Actualizar código
            const generatedCode = `ORD-${new Date().getFullYear()}-${String(order.id).padStart(6, "0")}`
            await tx.order.update({
                where: { id: order.id },
                data: { code: generatedCode }
            });

            // Validar si el valor es cero
            // 3. Crear la dirección de la orden  
            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName: address.firstName,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address?.address2,
                    phone: address.phone,
                    document: address.document,
                    cityId: parseInt(address.cityId.toString()),
                    departmentId: parseInt(address.departmentId.toString()),
                    orderId: order.id
                }
            });

            return {
                order: { ...order, code: generatedCode },
                orderAddress: orderAddress,
                updatedProducts: [],
            }
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx
        }

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return {
                ok: false,
                message: error.message
            };
        }

        return {
            ok: false,
            message: 'Ha ocurrido un error inesperado',
        };
    }
}