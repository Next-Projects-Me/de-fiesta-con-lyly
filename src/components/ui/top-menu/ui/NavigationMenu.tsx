'use client';

import { logout } from "@/actions/auth/logout";
import { useUiStore } from "@/store/ui/ui-store";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

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
    )
}
