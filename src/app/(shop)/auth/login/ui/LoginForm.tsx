"use client";

import { login } from '@/actions/auth/login';
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { GoogleButton } from './GoogleButton';
import { MdVpnKeyOff } from 'react-icons/md';
import { useUiStore } from '@/store/ui/ui-store';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    email: string;
    password: string;
}

interface Props {
    isModalAuth: boolean;
    setModalAuth?: () => void;
}

export const LoginForm = ({ isModalAuth, setModalAuth }: Props) => {

    const closeAllMenus = useUiStore(state => state.closeAllMenus);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setIsPending(true);
        setErrorMessage('');
        const { email, password } = data;
        const resp = await login(email, password);

        if (!resp.ok) {
            setErrorMessage(resp.message);
            setIsPending(false);
            return;
        }

        setIsPending(false);
        window.location.replace('/');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded"
                type="email"
                {...register('email', {
                    required: 'El correo es obligatorio',
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Debe ingresar un correo válido.  Ejemplo: ejemplo@dominio.com'
                    }
                })} />
            {
                errors.email && (<p className="text-red-500 text-xs">{errors.email.message}</p>)
            }

            <label htmlFor="password" className='mt-5'>Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded"
                type="password"
                {...register('password', {
                    required: 'La contraseña es obligatoria',
                })} />

            {
                errors.password && (<p className="text-red-500 text-xs">{errors.password.message}</p>)
            }

            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {
                    errorMessage && (
                        <div className='flex flex-row mb-2'>
                            <MdVpnKeyOff className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">&nbsp;Credenciales no son correctas</p>
                        </div>
                    )}
            </div>

            <button
                disabled={
                    isPending ? true : false
                }
                type='submit'
                className={clsx(
                    "cursor-pointer",
                    {
                        "btn-primary": !isPending,
                        "btn-disabled": isPending
                    })}>
                Ingresar
            </button>

            <Link
                onClick={() => closeAllMenus()}
                href="/auth/recovery-password"
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
