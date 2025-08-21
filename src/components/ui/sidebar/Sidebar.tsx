'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useUiStore } from '@/store/ui/ui-store';
import { useSession } from 'next-auth/react';
import { logout } from '@/actions/auth/logout';

import {
    IoCloseCircle,
    IoLogInOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoShirtOutline,
    IoTicketOutline
} from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
import { MdOutlineViewQuilt } from 'react-icons/md';

export const Sidebar = () => {

    const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
    const closeMenu = useUiStore(state => state.closeSideMenu);

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const profileImage = session?.user.image;

    const isAdmin = (session?.user.roleId === 1);

    const onLogout = async () => {
        await logout();
        window.location.reload();
        closeMenu();
    }

    return (
        <div>
            {
                isSideMenuOpen && (
                    <div className='fixed top-0 left-0 w-screen h-screen z-30 bg-black opacity-30' />
                )
            }
            {
                isSideMenuOpen && (
                    <div
                        onClick={closeMenu}
                        className='fade-in fixed top-0 left-0 w-screen h-screen z-30 backdrop-filter backdrop-blur-sm'
                    />
                )
            }

            <nav
                className={
                    clsx(
                        'overflow-y-scroll fixed p-5 right-0 top-0 w-full sm:w-[450px] h-screen bg-white z-40 shadow-2xl transform transition-all duration-300 flex flex-col',
                        {
                            'translate-x-full': !isSideMenuOpen
                        }
                    )
                }
            >

                <IoCloseCircle
                    size={30}
                    className='absolute top-5 right-5 cursor-pointer text-primary'
                    onClick={closeMenu}
                />

                <div className="mt-5 p-2 rounded-md self-center">
                    {
                        (!isAuthenticated || !profileImage)
                            ? <FaUserCircle className="w-28 h-28 text-primary" />
                            : <Image
                                src={profileImage!}
                                width={120}
                                height={120}
                                alt="Imagen de perfil"
                                className="rounded-full" />
                    }
                </div>

                {
                    isAuthenticated && (
                        <>
                            <Link
                                href="/profile"
                                onClick={closeMenu}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoPersonOutline size={30} />
                                <span className='ml-3 text-xl'>Perfil</span>
                            </Link>

                            <Link
                                href="/orders"
                                onClick={closeMenu}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoTicketOutline size={30} />
                                <span className='ml-3 text-xl'>Mis Ordenes</span>
                            </Link>

                        </>
                    )
                }

                {
                    (isAdmin && isAuthenticated) && (
                        <>
                            <Link
                                href="/admin/products"
                                onClick={closeMenu}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoShirtOutline size={30} />
                                <span className='ml-3 text-xl'>Productos</span>
                            </Link>

                            <Link
                                href="/admin/orders"
                                onClick={closeMenu}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoTicketOutline size={30} />
                                <span className='ml-3 text-xl'>Ordenes</span>
                            </Link>

                            <Link
                                href="/admin/users"
                                onClick={closeMenu}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <IoPeopleOutline size={30} />
                                <span className='ml-3 text-xl'>Usuarios</span>
                            </Link>

                            <Link
                                href="/admin/features"
                                onClick={closeMenu}
                                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                            >
                                <MdOutlineViewQuilt size={30} />
                                <span className='ml-3 text-xl'>Interfaz</span>
                            </Link>
                        </>
                    )
                }


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
                            onClick={closeMenu}
                            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                        >
                            <IoLogInOutline size={30} />
                            <span className='ml-3 text-xl'>Ingresar</span>
                        </Link>
                    )
                }
            </nav>
        </div>
    )
}
