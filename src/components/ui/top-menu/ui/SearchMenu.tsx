'use client';

import { useCartStore } from "@/store/cart/cart-store"
import { useUiStore } from "@/store/ui/ui-store"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { IoCartOutline, IoSearchCircle } from "react-icons/io5"

export const SearchMenu = () => {

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const profileImage = session?.user.image;

    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const openSideMenu = useUiStore(state => state.openSideMenu);

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <div className="flex items-center justify-evenly pr-5 sm:pr-15">
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
                            <span className="fade-in absolute z-10 text-[15px] px-1 rounded-full font-bold -top-2 -right-2 bg-primary text-white">
                                {totalItemsInCart}
                            </span>
                        )
                    }
                    <IoCartOutline className="w-10 h-10 transform hover:scale-125" />
                </div>
            </Link>
            <button
                onClick={openSideMenu}
                className="m-2 p-2 rounded-md hover:scale-125 cursor-pointer hidden sm:block">
                {
                    (!isAuthenticated || !profileImage)
                        ? <FaUser className="w-10 h-10 hover:scale-100 text-lime-400" />
                        : <Image
                            src={profileImage!}
                            width={40}
                            height={40}
                            alt="Imagen de perfil"
                            className="rounded-4xl" />
                }
            </button>
        </div>
    )
}
