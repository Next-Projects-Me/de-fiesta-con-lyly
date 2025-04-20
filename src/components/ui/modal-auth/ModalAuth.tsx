'use client';

import { useEffect, useRef } from "react";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";

interface Props {
    isModalLoginOpen: boolean;
    children: React.ReactNode;
}

export const ModalAuth = ({ children, isModalLoginOpen }: Props) => {

    const closeModalLogin = useUiStore(store => store.closeModalLogin)
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                closeModalLogin();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={divRef}
            className={
                clsx(
                    "absolute right-[14%] w-6 z-10 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary fade-in",
                    {
                        "hidden sm:block": isModalLoginOpen,
                        "hidden": !isModalLoginOpen,
                    }
                )
            }>
            <div className="absolute -right-2 z-10 p-10 mt-2 bg-white border-2 border-primary">
                {children}
            </div>
        </div>
    )
}
