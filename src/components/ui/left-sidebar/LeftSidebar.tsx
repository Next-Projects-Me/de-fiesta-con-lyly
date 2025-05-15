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
import { FaUser } from "react-icons/fa";
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
                        'fixed p-5 top-0 left-0 h-screen w-72 z-20 bg-white animate-slide-right transition-all duration-500 flex flex-col justify-between',
                        {
                            'translate-x-0': isLeftSideMenuOpen,
                            '-translate-x-full': !isLeftSideMenuOpen
                        },
                    )
                }
            >
                <div className="flex flex-col justify-self-start">
                    {/* <IoCloseCircle
                    size={30}
                    className='absolute top-5 right-5 cursor-pointer text-primary'
                    onClick={closeLeftSideMenu}
                />

                <div className='relative mt-14'>
                    <IoSearchOutline size={20} className='absolute top-2 left-2' />
                    <input
                        type='text'
                        placeholder='Buscar'
                        className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
                    />
                </div> */}

                    <div className="mt-10 p-2 rounded-md cursor-pointer self-center">
                        {
                            (!isAuthenticated || !profileImage)
                                ? <FaUser className="w-14 h-14 text-lime-400" />
                                : <Image
                                    src={profileImage!}
                                    width={90}
                                    height={90}
                                    alt="Imagen de perfil"
                                    className="rounded-full" />
                        }
                    </div>

                    <div
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoTicketOutline size={30} />
                        <span className='ml-3 text-xl'>Productos</span>
                    </div>

                    {
                        isAuthenticated && (
                            <div>

                                <Link
                                    href="/orders"
                                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                                >
                                    <IoTicketOutline size={30} />
                                    <span className='ml-3 text-xl'>Mis Ordenes</span>
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={closeLeftSideMenu}
                                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
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
