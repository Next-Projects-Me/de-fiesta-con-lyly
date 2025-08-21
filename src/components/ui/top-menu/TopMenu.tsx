'use client';

import { Category } from "@/interfaces/category.interface";
import { CategoryIcon } from "./ui/CategoryIcon";
import { FaSquareFacebook, FaSquareInstagram } from "react-icons/fa6";
import { IoCartOutline, IoMenuOutline, IoSearchCircle } from "react-icons/io5";
import { logout } from "@/actions/auth/logout";
import { ModalAuth } from "@/components/auth/modal-auth/ModalAuth";
import { useCartStore } from "@/store/cart/cart-store";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface Props {
    categories: Category[]
}

export const TopMenu = ({ categories }: Props) => {

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;

    const openMenu = useUiStore(state => state);
    const {
        isModalLoginOpen,
        isNavMenuOpen,
        openNavMenu,
        openModalLogin,
        openLeftSideMenu,
        openSearchbar,
        openSideMenu,
        closeNavMenu,
        closeModalLogin,
    } = openMenu;

    const totalItemsInCart = useCartStore(state => state.getTotalItems());

    const onOpeningModalLogin = () => {
        if (isModalLoginOpen) closeModalLogin();
        else openModalLogin();
    }

    const onOpeningNav = () => {
        if (isNavMenuOpen) closeNavMenu();
        else openNavMenu();
    }

    const onLogout = async () => {
        await logout();
        window.location.reload();
    }

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [loaded]);

    const categoryMenuRef = useRef<HTMLDivElement>(null);
    const loginModalRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const buttonLoginRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (loginModalRef.current && !loginModalRef.current.contains(event.target as Node) &&
                buttonLoginRef.current && !buttonLoginRef.current.contains(event.target as Node)
            ) {
                closeModalLogin();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [isModalLoginOpen, closeModalLogin]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                closeNavMenu();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isNavMenuOpen, closeNavMenu]);

    return (
        <nav className="">
            <div className="bg-linear-to-r from-rose-500 via-pink-500 to-purple-700 text-gray-900 sm:shadow-none z-30 fixed top-0 w-full">

                {/* Searching Menu */}
                <div className={
                    clsx(
                        "grid grid-cols-3 w-full mb-3 sm:h-16 transform transition-all duration-600 ",
                    )
                } >
                    <div className="flex justify-center items-center sm:mb-40 ">
                        <Link href="https://www.instagram.com/de_fiesta_con_lyly?igsh=c2hhZ2drZmRwbDR1" className="hidden sm:block">
                            <FaSquareInstagram className="w-14 h-14 mr-3 text-white hover:scale-120" />
                        </Link>
                        <Link href="https://www.facebook.com/defiestaconlyly" className="hidden sm:block">
                            <FaSquareFacebook className="w-14 h-14 text-white hover:scale-120" />
                        </Link>
                        <button onClick={openLeftSideMenu} className="block sm:hidden">
                            <IoMenuOutline className="w-10 h-10 text-white cursor-pointer" />
                        </button>
                    </div>

                    <div className="flex justify-center items-center">
                        <Link
                            href='/'
                            className="w-70 h-fit rounded-full flex justify-center items-center cursor-pointer">
                            <Image src="/imgs/Logo_redondo_sin_fondo.png"
                                className="my-2"
                                width={220}
                                height={220}
                                alt="Logo-DFCL" />
                        </Link>
                    </div>

                    <div className="flex items-center justify-evenly pr-5 sm:pr-15 sm:mb-40">
                        <button type="submit" className="p-2.5 ms-2 hidden sm:block">
                            <IoSearchCircle
                                onClick={openSearchbar}
                                className="w-12 h-12 text-white transform hover:scale-125 cursor-pointer" />
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
                                        <span className="fade-in absolute z-10 text-[15px] px-[6px] border-2 rounded-full font-bold -top-2 -right-2 bg-lime-300 text-">
                                            {totalItemsInCart}
                                        </span>
                                    )
                                }
                                <IoCartOutline className="w-10 h-10 transform hover:scale-125 text-white" />
                            </div>
                        </Link>
                        <button
                            onClick={openSideMenu}
                            className="m-2 p-2 rounded-md hover:scale-125 cursor-pointer hidden sm:block">
                            <IoMenuOutline className="w-10 h-10 text-white cursor-pointer" />
                        </button>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="hidden sm:flex justify-between items-center h-16 text-xl font-extrabold shadow-xl text-white">
                    <div className="flex w-[40%]">
                        <button
                            ref={buttonRef}
                            onClick={() => onOpeningNav()} className="w-full cursor-pointer hover:scale-120 duration-200">
                            Productos
                        </button>
                        <div className="w-full text-center hidden lg:block">
                            <Link href='/who' className="w-full hidden lg:block ">
                                <p className="cursor-pointer hover:scale-120 duration-200">¿Quiénes Somos?</p>
                            </Link>
                        </div>
                    </div>

                    <div className="w-[20%]" />

                    <div className="flex w-[40%]">
                        <div className="w-full text-center hidden lg:block">
                            <Link href='/what' className="">
                                <p className="cursor-pointer hover:scale-120 duration-200">¿Qué Hacemos?</p>
                            </Link>
                        </div>
                        <div className="w-full text-center">
                            {
                                isAuthenticated
                                    ? (
                                        <button onClick={() => onLogout()}
                                            className="cursor-pointer hover:scale-120 duration-200">
                                            Cerrar Sesión
                                        </button>
                                    )
                                    : (
                                        <button ref={buttonLoginRef}
                                            onClick={() => onOpeningModalLogin()}
                                            className="cursor-pointer hover:scale-120 duration-200">
                                            Ingresar
                                        </button>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <hr className="block sm:hidden border-2 border-white mt-0 sm:mt-3 " />

                {/* Login Modal */}
                <div ref={loginModalRef}>
                    <ModalAuth />
                </div>
            </div>

            {/* Categories Menu */}
            <div ref={categoryMenuRef}
                className={
                    clsx(
                        {
                            "hidden sm:block": isNavMenuOpen,
                            "hidden": !isNavMenuOpen,
                        }
                    )
                }>
                <div
                    className="fixed top-35 left-[9%] w-6 z-10 border-l-20 border-r-20 border-b-20 border-l-transparent border-r-transparent border-b-rose-500 fade-in">
                </div>
                <div
                    className={
                        clsx(
                            "overflow-y-auto fixed flex flex-wrap flex-row items-start not-only-of-type:bg-white rounded-xl rounded-r-none shadow-xl",
                            "border-2 border-l-primary border-t-primary border-b-purple-700 border-r-purple-700",
                            "z-10 gap-5 px-8 top-40 py-12 text-xl sm:w-[90%] lg:w-[95%] ml-10 h-[60%]",
                            "transform transition-all duration-600 fade-in",
                        )
                    }>
                    {
                        categories.map(category => (
                            <div key={category.id}>
                                {
                                    category.Subcategory.length > 0 &&
                                    <div className="flex flex-wrap flex-col">
                                        <span className="flex flex-wrap items-center font-bold text-rose-600">
                                            <CategoryIcon icon={category.icon} className="mr-4 my-2 text-4xl" />{category.name}
                                        </span>
                                        {
                                            category.Subcategory.map(subcategory => (
                                                <Link key={subcategory.id}
                                                    onClick={closeNavMenu}
                                                    href={`/category/${subcategory.id}`}
                                                    className="text-gray-500 hover:text-purple-700 hover:translate-x-2 transition-transform duration-200 cursor-pointer">
                                                    {subcategory.name}
                                                </Link>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div >
            </div>
        </nav>
    )
}


