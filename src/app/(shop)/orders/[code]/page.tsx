import { currencyFormat } from '../../../../utils/currencyFormat';
import { getOrderByCode } from "@/actions/order/get-order-by-id";
import { OrderStatus } from "@/components/orders/OrderStatus";
import { PaymentButton } from "@/components/payment/PaymentButton";
import { redirect } from "next/navigation";
import { ProductImage } from '@/components/product/product-image/ProductImage';

interface Props {
    params: Promise<{ code: string }>
}

export default async function OrdersByIdPage({ params }: Props) {

    const { code } = await params;
    const { ok, order } = await getOrderByCode(code);

    if (!ok) {
        redirect('/')
    }

    const address = order?.OrderAddress;

    return (
        <div className="flex justify-center items-center mb-20 px-5 sm:px-0">
            <div className="flex flex-col w-full">
                <div className="flex flex-col sm:flex-row justify-center">

                    {/* Carrito */}
                    <div className="sm:mr-10">
                        <p className='text-2xl font-bold mt-10 mb-5'>#{order?.code}</p>
                        <OrderStatus isPaid={order?.isPaid ?? false} />
                        <div className='border-interface p-5 mb-5 flex flex-col mt-5'>
                            {/* Items */}
                            {
                                order!.OrderItem.map(item => (
                                    <div key={item.product.slug + item.sizes + item.colors + item.numbers}
                                        className="flex flex-col sm:flex-row items-center sm:items-start border-b-2 border-gray-200 mb-5">
                                        <ProductImage
                                            src={item.product.ProductImage[0].url}
                                            alt={item.product.title}
                                            width={400}
                                            height={400}
                                            className="object-fill rounded w-full h-62 sm:w-42 sm:h-42 mb-5"
                                        />
                                        <div className='sm:ml-4 sm:mt-0 w-full sm:w-fit'>
                                            <p className='font-bold' >{item.product.title}</p>
                                            {
                                                item.sizes && <p>Talla: {item.sizes}</p>
                                            }
                                            {
                                                item.colors && (
                                                    <div className="flex items-center">
                                                        <p>Color: </p>
                                                        <div className="w-5 h-5 rounded-full ml-2" style={{ background: item.colors }}></div>
                                                    </div>
                                                )
                                            }
                                            {
                                                item.numbers && <p>Número: {item.numbers}</p>
                                            }
                                            {
                                                item.letters && <p>Letras: {item.letters}</p>
                                            }

                                            <p>{currencyFormat(item.price)} x {item.quantity}</p>
                                            <p className="font-bold mb-5">Subtotal: {currencyFormat(item.price * item.quantity)} </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    {/* Checkout - Resumen de orden  */}
                    <div className="sm:w-[60%] md:w-[40%] border-interface sm:mt-20 p-7 h-fit">
                        <h2 className="text-2xl mb-2">Dirección de entrega</h2>

                        <div className="mb-10" >
                            <p className="text-2xl font-bold">{address!.firstName} {address!.lastName}</p>
                            <p>{address!.address}</p>
                            <p>{address!.address2}</p>
                            <p>{address!.city.name} - {address!.department.name}</p>
                            <p>{address!.phone}</p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                        <h2 className="text-2xl mb-2">Resumen de orden</h2>
                        <div className="grid grid-cols-2">
                            <span>No. Productos</span>
                            <span className="text-right">
                                {order?.itemsInOrder === 1 ? '1 artículo' : `${order?.itemsInOrder} artículos`}
                            </span>

                            <span>Subtotal</span>
                            <span className="text-right">{currencyFormat(order!.subTotal)}</span>

                            <span>Impuestos ({(order!.tax * 100) / order!.subTotal}%)</span>
                            <span className="text-right">{currencyFormat(order!.tax)}</span>

                            <span className="mt-5">Envío</span>
                            <span className="mt-5 text-right">{order!.sendingCost > 0 ? currencyFormat(order!.sendingCost) : "Gratis"}</span>
                            <span className="mt-1 text-2xl">Total: </span>
                            <span className="mt-1 text-2xl text-right">{currencyFormat(order!.total)}</span>
                        </div>

                        <div className="mt-5 mb-2 w-full">
                            {
                                order?.isPaid
                                    ? (<OrderStatus isPaid={order!.isPaid ?? false} />)
                                    : (<PaymentButton orderId={order!.id} orderCode={order!.code} amount={order!.total} />)
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}