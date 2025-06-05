import { currencyFormat } from '../../../../utils/currencyFormat';
import { getOrderById } from "@/actions/order/get-order-by-id";
import { OrderStatus } from "@/components/orders/OrderStatus";
import { PaymentButton } from "@/components/payment/PaymentButton";
import { redirect } from "next/navigation";
import { Title } from "@/components/ui/title/Title";
import Image from "next/image";

interface Props {
    params: Promise<{ id: string }>
}

export default async function OrdersByIdPage({ params }: Props) {

    const { id } = await params;
    const { ok, order } = await getOrderById(id);

    if (!ok) {
        redirect('/')
    }

    const address = order?.OrderAddress;

    // Todo: verificar
    //Redirect(/)

    return (
        <div className="flex justify-center items-center mb-20 px-10 sm:px-0">
            <div className="flex flex-col w-full">
                <div className="flex flex-col sm:flex-row justify-center">

                    {/* Carrito */}
                    <div className="mr-10">
                        <Title title={`Orden #${id.split('-')[4]}...`} />
                        <OrderStatus isPaid={order?.isPaid ?? false} />
                        <div className='flex flex-col mt-5'>
                            {/* Items */}
                            {
                                order!.OrderItem.map(item => (
                                    <div key={item.product.slug + item.sizes + item.colors + item.numbers}
                                        className="flex border-b-2 border-gray-200 mb-5">
                                        <Image
                                            src={`/products/${item.product.ProductImage[0].url}`}
                                            alt={item.product.title}
                                            width={100}
                                            height={100}
                                            className="mr-5 mb-5 rounded w-42 h-42"
                                        />
                                        <div>
                                            <p>{item.product.title}</p>
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
                                                item.numbers && <p>Letras: {item.numbers}</p>
                                            }

                                            <p>{currencyFormat(item.price)} x {item.quantity}</p>
                                            <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)} </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                    {/* Checkout - Resumen de orden  */}
                    <div className="sm:w-[60%] md:w-[40%] bg-white rounded-xl shadow-xl sm:mt-20 p-7 h-fit">
                        <h2 className="text-2xl mb-2">Dirección de entrega</h2>
                        <div className="mb-10" >
                            <p className="text-2xl font-bold">{address!.firstName} {address!.lastName}</p>
                            <p>{address!.address}</p>
                            <p>{address!.address2}</p>
                            <p>{address!.cityId} {address!.departmentId}</p>
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

                            <span>Impuestos (15%)</span>
                            <span className="text-right">{currencyFormat(order!.tax)}</span>

                            <span className="mt-5 text-2xl">Total: </span>
                            <span className="mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>
                        </div>

                        <div className="mt-5 mb-2 w-full">
                            {
                                order?.isPaid
                                    ? (<OrderStatus isPaid={order?.isPaid ?? false} />)
                                    : (<PaymentButton orderId={id} amount={order!.total} />)
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}