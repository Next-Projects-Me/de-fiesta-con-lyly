'use client';

import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import Link from "next/link";

import { titleFont } from "@/config/fonts";
import { useCartStore } from "@/store/cart/cart-store";
import { useUiStore } from "@/store/ui/ui-store";


export const TopMenu = () => {

    const openMenu = useUiStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])


    return (
        <nav className="flex px-5 justify-between items-center w-full">
            <div>
                <Link
                    href="/">
                    <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
                    <span> | Shop</span>
                </Link>
            </div>

            <div className="hidden sm:block">
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href="/gender/men">
                    Hombres
                </Link>
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href="/gender/women">
                    Mujeres
                </Link>
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href="/gender/kid">
                    Niños
                </Link>
            </div>

            <div className="flex items-center">
                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="w-5 h-5" />
                </Link>
                <Link
                    href={
                        (totalItemsInCart === 0 && loaded)
                            ? "/empty"
                            : "/cart"
                    }
                    className="mx-2">
                    <div className="relative">
                        {
                            (totalItemsInCart > 0 && loaded) && (
                                <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                                    {totalItemsInCart}
                                </span>
                            )
                        }
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>
                <button
                    onClick={openMenu}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer">
                    Menú
                </button>
            </div>

        </nav>
    )
}


