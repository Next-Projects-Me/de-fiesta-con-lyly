'use client';

import { Category } from "@/interfaces/category.interface";
import { CategoryIcon } from "../top-menu/ui/CategoryIcon";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";
import { ImEnter, ImExit } from "react-icons/im";
import { IoArrowBack, IoHome, IoPeople, IoSearchCircle, IoShirt, IoTicket } from 'react-icons/io5';
import { logout } from "@/actions/auth/logout";
import { MdArrowForwardIos, MdOutlineViewQuilt } from "react-icons/md";
import { RiUserSettingsFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface Props {
    categories: Category[]
}

type FormInputs = {
    searching: string
}

export const LeftSidebar = ({ categories }: Props) => {

    const router = useRouter();
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

    const [step, setStep] = useState<0 | 1 | 2>(0);
    const [selectedMain, setSelectedMain] = useState<Category[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const closeMenu = () => {
        setStep(0);
        setSelectedMain(null);
        setSelectedCategory(null);
    };

    const goToStep = (s: 0 | 1 | 2) => setStep(s);

    const handleSelectMain = () => {
        setSelectedMain(categories);
        setStep(1);
    };

    const handleSelectCategory = (category: Category) => {
        setSelectedCategory(category);
        setStep(2);
    };

    const onOpenMenu = () => {
        closeLeftSideMenu();
        closeMenu();
    }

    const onCloseMenus = () => {
        closeLeftSideMenu();
        closeMenu();
    }

    const currentSubcategories =
        selectedMain && selectedCategory
            ? categories.findLast(cat => cat.id === selectedCategory.id)?.Subcategory
            : [];

    const { handleSubmit, register } = useForm<FormInputs>({});

    const onSearch = async (data: FormInputs) => {
        router.push(`/?searching=${data.searching}`);
        closeLeftSideMenu();
    }

    return (
        <>
            {
                isLeftSideMenuOpen && (
                    <div className='fixed top-0 left-0 w-full h-full z-30 bg-black opacity-30' />
                )
            }
            {
                isLeftSideMenuOpen && (
                    <div
                        onClick={onOpenMenu}
                        className='fade-in fixed top-0 left-0 w-full h-full z-30 backdrop-filter backdrop-blur-sm'
                    />
                )
            }

            <nav
                className={
                    clsx(
                        'fixed p-4 top-0 left-0 h-full w-72 z-30 bg-white animate-slide-right transition-all duration-500 flex flex-col justify-between',
                        {
                            'translate-x-0': isLeftSideMenuOpen,
                            '-translate-x-full': !isLeftSideMenuOpen
                        },
                    )
                }
            >

                {/* Sidebar */}
                <div className="fixed top-0 left-0 h-dvh w-full bg-white z-50 shadow-lg overflow-hidden">
                    <div
                        className="flex h-full w-[300%] transition-transform duration-300"
                        style={{
                            transform: `translateX(-${step * 33}%)`,
                        }}
                    >
                        {/* Paso 0: Menú principal */}
                        <div className="overflow-y-auto w-1/3 p-4 flex flex-col justify-between text-primary">
                            <div className="space-y-4">
                                <div className="flex justify-center items-center pb-2">
                                    <div className="p-2 rounded-md self-center">
                                        {
                                            (!isAuthenticated || !profileImage)
                                                ? <FaUserCircle className="w-22 h-22" />
                                                : <Image
                                                    src={profileImage!}
                                                    width={100}
                                                    height={100}
                                                    alt="Imagen de perfil"
                                                    className="rounded-full" />
                                        }
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSearch)} className="flex flex-row mb-5">
                                    <input placeholder="Busca tu producto favorito.."
                                        className="border-b-2 p-2 focus:outline-0 focus:text-rose-700"
                                        {...register('searching', { required: true })} />

                                    <button type="submit" >
                                        <IoSearchCircle className="text-4xl" />
                                    </button>
                                </form>
                                <div onClick={() => handleSelectMain()}
                                    className="flex items-center justify-between">
                                    <div className="flex items-center justify-center">
                                        <IoHome className="w-8 h-8 mr-2 text-primary" />
                                        <div className="w-full text-left font-medium">
                                            Productos
                                        </div>
                                    </div>
                                    <MdArrowForwardIos />
                                </div>

                                {
                                    isAuthenticated && (
                                        <>
                                            <Link href="/profile"
                                                onClick={closeLeftSideMenu}
                                                className="flex items-center justify-between">
                                                <div className="flex items-center justify-center">
                                                    <RiUserSettingsFill className="w-10 h-10 mr-2 text-primary" />
                                                    <div className="w-full text-left font-medium">
                                                        Perfil
                                                    </div>
                                                </div>
                                                <MdArrowForwardIos />
                                            </Link>
                                            <Link href="/orders"
                                                onClick={closeLeftSideMenu}
                                                className="flex items-center justify-between">
                                                <div className="flex items-center justify-center">
                                                    <FaShoppingCart className="w-8 h-8 mr-2 text-primary" />
                                                    <div className="w-full text-left font-medium">
                                                        Mis Ordenes
                                                    </div>
                                                </div>
                                                <MdArrowForwardIos />
                                            </Link>
                                        </>
                                    )
                                }

                                {
                                    (isAdmin && isAuthenticated) && (
                                        <>
                                            <Link
                                                href="/admin/products"
                                                onClick={closeLeftSideMenu}
                                                className='flex items-center justify-between'
                                            >
                                                <div className="flex items-center justify-center">
                                                    <IoShirt className="w-8 h-8 mr-2 text-primary" />
                                                    <div className='w-full text-left font-medium'>
                                                        Productos
                                                    </div>
                                                </div>
                                                <MdArrowForwardIos />
                                            </Link>

                                            <Link
                                                href="/admin/orders"
                                                onClick={closeLeftSideMenu}
                                                className='flex items-center justify-between'
                                            >
                                                <div className="flex items-center justify-center">
                                                    <IoTicket className="w-8 h-8 mr-2 text-primary" />
                                                    <div className='w-full text-left font-medium'>
                                                        Ordenes
                                                    </div>
                                                </div>
                                                <MdArrowForwardIos />
                                            </Link>

                                            <Link
                                                href="/admin/users"
                                                onClick={closeLeftSideMenu}
                                                className='flex items-center justify-between'
                                            >
                                                <div className="flex items-center justify-center">
                                                    <IoPeople className="w-8 h-8 mr-2 text-primary" />
                                                    <div className='w-full text-left font-medium'>
                                                        Usuarios
                                                    </div>
                                                </div>
                                                <MdArrowForwardIos />
                                            </Link>

                                            <Link
                                                href="/admin/features"
                                                onClick={closeLeftSideMenu}
                                                className='flex items-center justify-between'
                                            >
                                                <div className="flex items-center justify-center">
                                                    <MdOutlineViewQuilt className="w-8 h-8 mr-2 text-primary" />
                                                    <div className='w-full text-left font-medium'>
                                                        Interfaz
                                                    </div>
                                                </div>
                                                <MdArrowForwardIos />
                                            </Link>
                                        </>
                                    )
                                }
                            </div>

                            <div className="space-y-4">
                                <Link href="/who"
                                    onClick={closeLeftSideMenu}
                                    className="flex items-center justify-between">
                                    <div className="flex items-center justify-center">
                                        <FaPersonCircleQuestion className="w-7 h-7 mr-2 text-primary" />
                                        <div className="w-full text-left font-medium">
                                            ¿Quienes Somos?
                                        </div>
                                    </div>
                                </Link>
                                <Link href="/what"
                                    onClick={closeLeftSideMenu}
                                    className="flex items-center justify-between">
                                    <div className="flex items-center justify-center">
                                        <GiStairsGoal className="w-7 h-7 mr-2 text-primary" />
                                        <div className="w-full text-left font-medium">
                                            ¿Qué Hacemos?
                                        </div>
                                    </div>
                                </Link>
                                <div>
                                    {
                                        isAuthenticated && (

                                            <div onClick={() => onLogout()}
                                                className="flex items-center justify-between">
                                                <div className="flex items-center justify-center">
                                                    <ImExit className="w-10 h-10 ml-1 mr-2 text-primary" />
                                                    <div className="w-full text-left font-medium">
                                                        Salir
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        !isAuthenticated && (
                                            <Link
                                                onClick={closeLeftSideMenu}
                                                href="/auth/login"
                                                className="flex items-center justify-between">
                                                <div className="flex items-center justify-center">
                                                    <ImEnter className="w-10 h-10 mr-2 text-primary" />
                                                    <div className="w-full text-left font-medium">
                                                        Ingresar
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>

                        </div>

                        {/* Paso 1: Categorías */}
                        <div className="overflow-y-auto w-1/3 p-4 space-y-4 text-pink-600">
                            <div className="flex items-center gap-2 border-b pb-2">
                                <IoArrowBack onClick={() => goToStep(0)} />
                                <IoHome className="w-8 h-8 mr-2" />
                                <h2 className="text-lg font-semibold">Categorías</h2>
                            </div>
                            {
                                categories.map((cat) => (
                                    <div key={cat.id}
                                        onClick={() => handleSelectCategory(cat)}
                                        className="flex items-center justify-between">
                                        <div className="flex items-center ">
                                            <CategoryIcon icon={cat.icon} className="mr-2 w-8 h-8 " />
                                            <p className="w-full text-left">
                                                {cat.name}
                                            </p>
                                        </div>
                                        <MdArrowForwardIos />
                                    </div>
                                ))}
                        </div>

                        {/* Paso 2: Subcategories */}
                        <div className="overflow-y-auto w-1/3 p-4 space-y-4 flex flex-col text-purple-700">
                            <div className="flex items-center gap-2 border-b pb-2">
                                <IoArrowBack onClick={() => goToStep(1)} />
                                <CategoryIcon icon={selectedCategory?.icon} className="mr-2 w-8 h-8 " />
                                <h2 className="text-lg font-semibold">{selectedCategory?.name}</h2>
                            </div>
                            {
                                currentSubcategories!.map((sub) => (
                                    <Link
                                        key={sub.id}
                                        href={`/category/${sub.id}`}
                                        className="w-full text-left text-base"
                                        onClick={onCloseMenus}
                                    >
                                        {sub.name}
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
