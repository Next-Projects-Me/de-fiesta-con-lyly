'use client';

import { CategoriesMenu } from "./ui/CategoriesMenu";
import { ModalAuth } from "@/components/auth/modal-auth/ModalAuth";
import { NavigationMenu } from "./ui/NavigationMenu";
import { SearchMenu } from "./ui/SearchMenu";
import { SocialMediaMenu } from "./ui/SocialMediaMenu";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface Props {
    categories: Category[]
}


export const TopMenu = ({ categories }: Props) => {

    const [isScrolled, setIsScrolled] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsScrolled(window.scrollY > 50);
    //     };
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);


    return (
        <nav className="">
            <div className="bg-primary sm:bg-white sm:shadow-none z-20 fixed top-0 w-full">
                <div className={
                    clsx(
                        "grid grid-cols-3 justify-start items-center w-full mb-3 sm:h-16 transform transition-all duration-600",
                        // {
                        //     'sm:h-16': isScrolled,
                        //     'sm:h-32': !isScrolled,
                        // }
                    )
                }>

                    <SocialMediaMenu />

                    <div className="">
                        <Link
                            href="/"
                            className="flex justify-center items-center">
                            <Image src="/imgs/Logo_redondo_sin_fondo.png"
                                className="my-2 transform transition-all duration-600"
                                width={180}
                                height={180}
                                // width={isScrolled ? 180 : 250}
                                // height={isScrolled ? 180 : 250}
                                alt="Logo-DFCL" />
                        </Link>
                    </div>

                    <SearchMenu />

                </div>

                <NavigationMenu />

                <hr className="block sm:hidden border-2 border-white mt-0 sm:mt-3 " />

                <ModalAuth />
            </div>
            <CategoriesMenu isScrolled={isScrolled} categories={categories} />
        </nav>
    )
}


