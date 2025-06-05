'use client';

import { LoginForm } from "@/app/(shop)/auth/login/ui/LoginForm";
import { RegisterForm } from "@/app/(shop)/auth/new-account/ui/RegisterForm";
import { useEffect, useRef, useState } from "react";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";


export const ModalAuth = () => {

    const isModalLoginOpen = useUiStore(state => state.isModalLoginOpen);
    const closeModalLogin = useUiStore(store => store.closeModalLogin)
    const divRef = useRef<HTMLDivElement>(null);

    const [modalSelected, setModalSelected] = useState('login');

    const onModalSelected = () => {
        if (modalSelected === 'login') {
            setModalSelected('register')
        }
        else setModalSelected('login')
    }

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
    }, [closeModalLogin]);


    return (
        <div
            ref={divRef}
            className={
                clsx(
                    "absolute right-[8%] w-6 z-10 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-primary fade-in",
                    {
                        "hidden sm:block": isModalLoginOpen,
                        "hidden": !isModalLoginOpen,
                    }
                )
            }>
            <div className="absolute -right-6 z-10 p-10 mt-2 bg-white border-2 border-primary rounded-2xl">
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
            </div>
        </div>
    )
}
