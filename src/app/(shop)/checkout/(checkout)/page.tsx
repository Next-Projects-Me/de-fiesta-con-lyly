import { Title } from "@/components/ui/title/Title";
import Link from "next/link";
import { ProductsinCart } from "./ui/ProductsinCart";
import { PlaceOrder } from "./ui/PlaceOrder";
import { getIvaPercent } from "@/actions/costs/get-iva-percent";
import { getSendingCost } from "@/actions/costs/get-sending-price";

export default async function CheckoutPage() {

    const iva = await getIvaPercent();
    const sending = await getSendingCost();

    return (
        <div className="flex justify-center items-center mb-20 px-5 sm:px-0">
            <div className="flex flex-col w-full">
                <div className="flex flex-col sm:flex-row justify-center">

                    <div className="sm:mr-10">
                        <Title title='Verificar Orden' className="mt-7" />
                        <div className="flex flex-col mt-5">
                            <span className="text-xl">Ajustar elementos</span>
                            <Link href="/cart" className="underline mb-5">
                                Editar carrito
                            </Link>

                            <ProductsinCart />
                        </div>

                    </div>
                    <div className="sm:w-[60%] md:w-[40%] border-interface sm:mt-20 p-7 h-fit">
                        <PlaceOrder iva={iva} sending={sending!} />
                    </div>
                </div>
            </div>
        </div>
    );
}