'use client';

import { logout } from "@/actions/auth/logout";
import { useUiStore } from "@/store/ui/ui-store";
import { useSession } from "next-auth/react";

export const NavigationMenu = () => {

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;

    const openMenu = useUiStore(state => state);
    const {
        isModalLoginOpen,
        isNavMenuOpen,
        openNavMenu,
        openModalLogin,
        closeNavMenu,
        closeModalLogin,
    } = openMenu;

    const onOpeningModalLogin = () => {

        if (isModalLoginOpen) {
            closeModalLogin();
        }
        else {
            openModalLogin();
        }
    }

    const onOpeningNav = () => {

        if (isNavMenuOpen) {
            closeNavMenu();
        }
        else {
            openNavMenu();
        }
    }

    const onLogout = async () => {
        await logout();
        window.location.reload();
    }

    return (
        <div className="bg-primary hidden sm:flex justify-between items-center h-16 text-xl sm:text-sm md:text-lg lg:text-xl shadow-gray-300 shadow-xl text-white">

            <div className="flex justify-evenly w-[32%] lg:w-[40%]">

                <button onClick={() => onOpeningNav()} className="w-full cursor-pointer hover:scale-120 duration-200">
                    Productos
                </button>

                <button className="w-full cursor-pointer hover:scale-120 duration-200">
                    ¿Quiénes Somos?
                </button>
            </div>

            <div className="flex justify-evenly w-[32%] lg:w-[40%]">
                <button className="w-full cursor-pointer hover:scale-120 duration-200 ">
                    ¿Qué Hacemos?
                </button>
                {
                    isAuthenticated
                        ? (
                            <button onClick={() => onLogout()} className="w-full cursor-pointer hover:scale-120 duration-200">
                                Cerrar Sesión
                            </button>
                        )
                        : (
                            <button onClick={() => onOpeningModalLogin()} className="w-full cursor-pointer hover:scale-120 duration-200">
                                Ingresar
                            </button>
                        )
                }

            </div>

        </div>
    )
}
