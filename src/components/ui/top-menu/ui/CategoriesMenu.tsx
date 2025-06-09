'use client';

import { CategoryIcon } from "./CategoryIcon";
import { useEffect, useRef } from "react";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import Link from "next/link";
import { Category } from "@/interfaces/category.interface";

interface Props {
    // isScrolled: Boolean;
    categories: Category[];
}

export const CategoriesMenu = ({ categories }: Props) => {

    const isNavMenuOpen = useUiStore(state => state.isNavMenuOpen);
    const closeNavMenu = useUiStore(store => store.closeNavMenu);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                closeNavMenu();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeNavMenu]);


    return (
        <div ref={divRef}
            className={
                clsx(
                    "overflow-y-scroll fixed flex flex-wrap flex-row items-start not-only-of-type:bg-white text-primary shadow-md border-b-2 border-primary",
                    "z-10 gap-5 px-5 top-34 py-12 text-xl w-full h-[60%]",
                    "transform transition-all duration-600 fade-in",
                    {
                        // 'top-32 py-16': isScrolled,
                        // 'top-52 py-12': !isScrolled,
                        "hidden": !isNavMenuOpen,
                    }
                )
            }>
            {
                categories.map(category => (
                    <div key={category.id} className="flex flex-wrap flex-col">
                        <span className="flex flex-wrap items-center font-bold">
                            <CategoryIcon icon={category.icon} className="mr-4 my-2 text-4xl" />{category.name}
                        </span>
                        {
                            category.Subcategory.map(subcategory => (
                                <Link key={subcategory.id}
                                    onClick={closeNavMenu}
                                    href={`/category/${subcategory.id}`}
                                    className="text-gray-600 hover:text-primary hover:translate-x-2 transition-transform duration-200 cursor-pointer">
                                    {subcategory.name}
                                </Link>
                            ))
                        }
                    </div>
                ))
            }

        </div >
    )
}
