'use client';

import { LoginForm } from "@/app/(shop)/auth/login/ui/LoginForm";
import { RegisterForm } from "@/app/(shop)/auth/new-account/ui/RegisterForm";
import { useState } from "react";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";

export const ModalAuth = () => {

    const isModalLoginOpen = useUiStore(state => state.isModalLoginOpen);
    const [modalSelected, setModalSelected] = useState('login');

    const onModalSelected = () => {
        if (modalSelected === 'login') {
            setModalSelected('register')
        }
        else setModalSelected('login')
    }

    return (
        <div className={
            clsx(
                "absolute right-[8%] w-6 -z-10 border-l-20 border-r-20 border-b-20 border-l-transparent border-r-transparent border-b-primary fade-in",
                {
                    "hidden sm:block": isModalLoginOpen,
                    "hidden": !isModalLoginOpen,
                }
            )
        }>
            <div className="absolute -right-10 p-10 mt-5 bg-white border-2 border-primary rounded-2xl">
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
