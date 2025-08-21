import Link from "next/link";
import { Title } from "@/components/ui/title/Title";
import { ProductsinCart } from "./ui/ProductsinCart";
import { OrderSummary } from "./ui/OrderSummary";
import { getIvaPercent } from "@/actions/costs/get-iva-percent";
import { getSendingCost } from "@/actions/costs/get-sending-price";

export default async function CartPage() {

    const iva = await getIvaPercent();
    const sending = await getSendingCost();

    return (
        <div className="flex justify-center items-center mb-20 p-5 sm:p-0 sm:px-0 sm:mt-0">
            <div className="flex flex-col w-full ">
                <div className="flex flex-col sm:flex-row justify-center">

                    <div className="sm:mr-10">
                        <Title title='Carrito' className="sm:mt-7" />
                        <div className="flex flex-col mt-5">
                            <span>Agregar más items</span>
                            <Link href="/" className="underline mb-5">
                                Continúa comprando
                            </Link>

                            <ProductsinCart />
                        </div>
                    </div>


                    {/* Checkout - Resumen de orden  */}
                    <div className="sm:w-[60%] md:w-[40%] border-interface sm:mt-20 p-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>
                        <OrderSummary iva={iva} sending={sending!} />

                        <div className="mt-5 mb-2 w-full">
                            <Link
                                className="flex btn-primary justify-center"
                                href="/checkout/address">
                                Agregar dirección
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}