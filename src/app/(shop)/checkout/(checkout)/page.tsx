import { Title } from "@/components/ui/title/Title";
import Link from "next/link";
import { ProductsinCart } from "./ui/ProductsinCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
    return (
        <div className="flex justify-center items-center mb-20 px-10 sm:px-0">
            <div className="flex flex-col w-full">
                <div className="flex flex-col sm:flex-row justify-center">

                    <div className="mr-10">
                        <Title title='Verificar Orden' />
                        <div className="flex flex-col mt-5">
                            <span className="text-xl">Ajustar elementos</span>
                            <Link href="/cart" className="underline mb-5">
                                Editar carrito
                            </Link>

                            <ProductsinCart />
                        </div>

                    </div>
                    <div className="sm:w-[60%] md:w-[40%]  bg-white rounded-xl shadow-xl sm:mt-20 p-7 h-fit">
                        <PlaceOrder />
                    </div>
                </div>
            </div>
        </div>
    );
}