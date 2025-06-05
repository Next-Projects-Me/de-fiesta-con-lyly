'use client';

import { IoCartOutline, IoMenuOutline, IoSearchCircle } from "react-icons/io5";
import { useCartStore } from "@/store/cart/cart-store";
import { useEffect, useState } from "react";
import { useUiStore } from "@/store/ui/ui-store";
import Link from "next/link";

export const SearchMenu = () => {

    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const openSideMenu = useUiStore(state => state.openSideMenu);

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <div className="flex items-center justify-evenly pr-5 sm:pr-15 sm:mb-30">
            <button type="submit" className="p-2.5 ms-2 hidden sm:block">
                <IoSearchCircle className="w-12 h-12 text-purple-700 transform hover:scale-125 cursor-pointer" />
            </button>
            <Link
                href={
                    (totalItemsInCart === 0 && loaded)
                        ? "/empty"
                        : "/cart"
                }
                className="">
                <div className="relative">
                    {
                        (totalItemsInCart > 0 && loaded) && (
                            <span className="fade-in absolute z-10 text-[15px] px-[6px] rounded-full font-bold -top-2 -right-2 bg-lime-300 text-black">
                                {totalItemsInCart}
                            </span>
                        )
                    }
                    <IoCartOutline className="w-10 h-10 transform hover:scale-125 text-white sm:text-black" />
                </div>
            </Link>
            <button
                onClick={openSideMenu}
                className="m-2 p-2 rounded-md hover:scale-125 cursor-pointer hidden sm:block">
                <IoMenuOutline className="w-10 h-10 text-primary cursor-pointer" />
            </button>
        </div>
    )
}
