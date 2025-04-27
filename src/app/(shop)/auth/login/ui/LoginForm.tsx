"use client";

import { authenticate } from '@/actions/auth/login';
import { useActionState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { GoogleButton } from './GoogleButton';
import { MdVpnKeyOff } from 'react-icons/md';

interface Props {
    isModalAuth: boolean;
    setModalAuth?: () => void;
}

export const LoginForm = ({ isModalAuth, setModalAuth }: Props) => {

    const [state, formAction, isPending] = useActionState(authenticate, undefined);

    useEffect(() => {
        if (state === 'Success') {
            window.location.replace('/');
        }
    }, [state])


    return (
        <form action={formAction} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name="email" />

            <label htmlFor="password">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded"
                type="password"
                name="password" />
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {
                    state && (
                        <div className='flex flex-row mb-2'>
                            <MdVpnKeyOff className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">&nbsp;Credenciales no son correctas</p>
                        </div>
                    )}
            </div>

            <button
                type='submit'
                className={clsx(
                    "cursor-pointer",
                    {
                        "btn-primary": !isPending,
                        "btn-disabled": isPending
                    })}>
                Ingresar
            </button>

            <Link href="/auth/recovery-password"
                className='self-center mt-3 hover:text-primary'>
                ¿Olvidaste tu contraseña?
            </Link>

            {/* divisor line */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <Image
                    src="/imgs/Pinata-burrito.png"
                    alt="Burrito"
                    width={60}
                    height={60}
                    className='mx-10'
                />
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <GoogleButton />

            {
                !isModalAuth
                    ? (
                        <Link
                            href="/auth/new-account"
                            className="btn-secondary text-center cursor-pointer">
                            Crear una nueva cuenta
                        </Link>
                    )
                    :
                    (
                        <button
                            onClick={() => setModalAuth?.()}
                            className="btn-secondary text-center cursor-pointer">
                            Crear una nueva cuenta
                        </button>
                    )
            }

        </form>
    )
}
