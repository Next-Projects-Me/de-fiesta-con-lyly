'use client';

import { logout } from "@/actions/auth/logout";
import { useSession } from "next-auth/react";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import Link from "next/link";

import {
    IoLogInOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoShirtOutline,
    IoTicketOutline
} from 'react-icons/io5';
import { FaUser, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

export const LeftSidebar = () => {

    const isLeftSideMenuOpen = useUiStore(state => state.isLeftSideMenuOpen);
    const closeLeftSideMenu = useUiStore(state => state.closeLeftSideMenu);

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = (session?.user.roleId === 1);
    const profileImage = session?.user.image;

    const onLogout = async () => {
        await logout();
        window.location.reload();
        closeLeftSideMenu();
    }


    return (
        <>
            {
                isLeftSideMenuOpen && (
                    <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
                )
            }
            {
                isLeftSideMenuOpen && (
                    <div
                        onClick={closeLeftSideMenu}
                        className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
                    />
                )
            }

            <nav
                className={
                    clsx(
                        'overflow-y-scroll fixed p-5 top-0 left-0 h-screen w-72 z-20 bg-white animate-slide-right transition-all duration-500 flex flex-col justify-between',
                        {
                            'translate-x-0': isLeftSideMenuOpen,
                            '-translate-x-full': !isLeftSideMenuOpen
                        },
                    )
                }
            >
                <div className="flex flex-col justify-self-start">

                    <div className="mt-10 p-2 rounded-md self-center">
                        {
                            (!isAuthenticated || !profileImage)
                                ? <FaUserCircle className="w-22 h-22 text-primary" />
                                : <Image
                                    src={profileImage!}
                                    width={100}
                                    height={100}
                                    alt="Imagen de perfil"
                                    className="rounded-full" />
                        }
                    </div>

                    <button
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all cursor-pointer'
                    >
                        <IoTicketOutline size={30} />
                        <span className='ml-3 text-xl'>Productos</span>
                    </button>

                    {
                        isAuthenticated && (
                            <div>

                                <Link
                                    href="/orders"
                                    className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
                                >
                                    <IoTicketOutline size={30} />
                                    <span className='ml-3 text-xl'>Mis Ordenes</span>
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={closeLeftSideMenu}
                                    className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all'
                                >
                                    <IoPersonOutline size={30} />
                                    <span className='ml-3 text-xl'>Perfil</span>
                                </Link>
                            </div>
                        )
                    }


                    {
                        isAdmin && (
                            <div>
                                <div className='w-full h-px bg-gray-200 my-10' />
                                <Link
                                    href="/"
                                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                                >
                                    <IoShirtOutline size={30} />
                                    <span className='ml-3 text-xl'>Productos</span>
                                </Link>

                                <Link
                                    href="/"
                                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                                >
                                    <IoTicketOutline size={30} />
                                    <span className='ml-3 text-xl'>Ordenes</span>
                                </Link>

                                <Link
                                    href="/"
                                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                                >
                                    <IoPeopleOutline size={30} />
                                    <span className='ml-3 text-xl'>Usuarios</span>
                                </Link>
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        isAuthenticated && (
                            <button
                                onClick={() => onLogout()}
                                className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all cursor-pointer'
                            >
                                <IoLogOutOutline size={30} />
                                <span className='ml-3 text-xl'>Salir</span>
                            </button>
                        )
                    }

                    {
                        !isAuthenticated && (
                            <Link
                                href="/auth/login"
                                onClick={closeLeftSideMenu}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoLogInOutline size={30} />
                                <span className='ml-3 text-xl'>Ingresar</span>
                            </Link>
                        )
                    }
                </div>

            </nav>
        </>
    )
}
