import { Title } from "@/components/ui/title/Title";
import Link from "next/link";
import { ProductsinCart } from "./ui/ProductsinCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function ChekoutPage() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000pcx]">
                <Title title='Verificar Orden' />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Ajustar elementos</span>
                        <Link href="/cart" className="underline mb-5">
                            Editar carrito
                        </Link>

                        {/* Items */}
                        <ProductsinCart />
                    </div>

                    {/* Checkout - Resumen de orden  */}
                    <PlaceOrder />
                </div>
            </div>
        </div>
    );
}