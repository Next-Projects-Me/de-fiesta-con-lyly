'use client';

import { CategoriesMenu } from "./ui/CategoriesMenu";
import { FaSquareFacebook, FaSquareInstagram } from "react-icons/fa6";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoCartOutline, IoMenuOutline, IoSearchCircle, IoSearchOutline } from "react-icons/io5";
import { LoginForm } from "@/app/auth/login/ui/LoginForm";
import { logout } from "@/actions/auth/logout";
import { ModalAuth } from "../modal-auth/ModalAuth";
import { RegisterForm } from "@/app/auth/new-account/ui/RegisterForm";
import { useCartStore } from "@/store/cart/cart-store";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUiStore } from "@/store/ui/ui-store";
import Link from "next/link";
import Image from "next/image";


export const TopMenu = () => {

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const profileImage = session?.user.image;

    const openMenu = useUiStore(state => state);
    const {
        isNavMenuOpen,
        isModalLoginOpen,
        openNavMenu,
        openSideMenu,
        openModalLogin,
        closeNavMenu,
        closeModalLogin,
        closeAllMenus
    } = openMenu;

    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const [loaded, setLoaded] = useState(false);
    const [modalSelected, setModalSelected] = useState('login');

    useEffect(() => {
        setLoaded(true);
    }, [])

    const onOpeningNav = () => {
        if (isNavMenuOpen) {
            closeNavMenu();
        }
        else {
            closeModalLogin();
            openNavMenu();
        }
    }

    const onOpeningModalLogin = () => {
        if (isModalLoginOpen) {
            closeModalLogin();
        }
        else {
            closeNavMenu();
            openModalLogin();
        }
    }

    const onModalSelected = () => {
        if (modalSelected === 'login') {
            setModalSelected('register')
        }
        else setModalSelected('login')
    }

    const onLogout = async () => {
        await logout();
        window.location.reload();
    }

    return (
        <nav>
            <div onClick={() => closeAllMenus()}
                className="grid grid-cols-3 items-center w-full mb-3">

                <div className="flex justify-center items-center">
                    <Link href="/" className="hidden sm:block">
                        <FaSquareInstagram className="w-14 h-14 text-pink-600 hover:scale-120" />
                    </Link>
                    <Link href="/" className="hidden sm:block">
                        <FaSquareFacebook className="w-14 h-14 text-blue-600 hover:scale-120" />
                    </Link>
                    <button className="block sm:hidden">
                        <IoMenuOutline className="w-10 h-10 text-primary cursor-pointer" />
                    </button>
                </div>


                <div className="">
                    <Link
                        href="/"
                        className="flex justify-center items-center">
                        <img src="/imgs/Logo_redondo.jpeg" className="w-72 my-2" />
                    </Link>
                </div>

                <div className="flex items-center justify-evenly pr-5 sm:pr-15">
                    <button type="submit" className="p-2.5 ms-2">
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
            </div>

            <div className="sr-only sm:not-sr-only flex justify-evenly px-5 items-center w-full h-10 text-xl text-gray-600">
                <button onClick={() => onOpeningNav()} className="cursor-pointer hover:text-primary hover:scale-120 duration-200">
                    PRODUCTOS
                </button>
                <button className="cursor-pointer hover:text-primary hover:scale-120 duration-200">
                    ¿QUIÉNES SOMOS?
                </button>
                <button className="cursor-pointer hover:text-primary hover:scale-120 duration-200">
                    ¿QUÉ HACEMOS?
                </button>
                {
                    isAuthenticated
                        ? (
                            <button onClick={() => onLogout()} className="cursor-pointer hover:text-primary hover:scale-120 duration-200">
                                CERRAR SESIÓN
                            </button>
                        )
                        : (
                            <button onClick={() => onOpeningModalLogin()} className="cursor-pointer hover:text-primary hover:scale-120 duration-200">
                                INGRESAR
                            </button>
                        )
                }

            </div>
            <hr className="border-2 border-primary mt-0 sm:mt-3" />

            <CategoriesMenu isNavMenuOpen={isNavMenuOpen} />

            <ModalAuth isModalLoginOpen={isModalLoginOpen}>
                {
                    (modalSelected === 'login')
                        ? (
                            <LoginForm
                                isModalAuth={true}
                                setModalAuth={() => onModalSelected()} />
                        )
                        : (
                            <RegisterForm
                                isModalAuth={true}
                                setModalAuth={() => onModalSelected()} />
                        )
                }
            </ModalAuth>
        </nav>
    )
}


