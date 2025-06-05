'use client';

import { FaSquareFacebook, FaSquareInstagram } from "react-icons/fa6";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import { useUiStore } from "@/store/ui/ui-store";

export const SocialMediaMenu = () => {

    const openLeftSideMenu = useUiStore(state => state.openLeftSideMenu);

    return (
        <div className="flex justify-center items-center sm:mb-30 z-10">
            <Link href="/" className="hidden sm:block">
                <FaSquareInstagram className="w-14 h-14 text-pink-600 hover:scale-120" />
            </Link>
            <Link href="/" className="hidden sm:block">
                <FaSquareFacebook className="w-14 h-14 text-blue-600 hover:scale-120" />
            </Link>
            <button onClick={openLeftSideMenu} className="block sm:hidden">
                <IoMenuOutline className="w-10 h-10 text-white cursor-pointer" />
            </button>
        </div>
    )
}
