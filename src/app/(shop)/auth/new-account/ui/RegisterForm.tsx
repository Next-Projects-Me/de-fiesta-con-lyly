'use client';

import { login } from '@/actions/auth/login';
import { registerUser } from '@/actions/auth/register';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    name: string;
    email: string;
    password: string;
}

interface Props {
    isModalAuth: boolean;
    setModalAuth?: () => void;
}

export const RegisterForm = ({ isModalAuth, setModalAuth }: Props) => {

    const [isPending, setIsPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setIsPending(true);
        setErrorMessage('');
        const { name, email, password } = data;
        const resp = await registerUser(name, email, password);

        if (!resp.ok) {
            setIsPending(false);
            setErrorMessage(resp.message);
            return;
        }

        setIsPending(false);
        await login(email.toLowerCase(), password);
        window.location.replace('/');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                autoFocus
                {...register('email', {
                    required: 'El correo es obligatorio',
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Debe ingresar un dominio. Ejemplo: @dominio.com'
                    }
                })}
            />
            {
                errors.email && (<p className="text-red-500 text-xs">{errors.email.message}</p>)
            }


            <label htmlFor="text" className='mt-5'>Nombre completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text"
                {...register('name', { required: 'El nombres es obligatorio' })}
            />
            {
                errors.name && (<p className="text-red-500 text-xs">{errors.name.message}</p>)
            }

            <label htmlFor="password" className='mt-5'>Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                type="password"
                {...register('password', {
                    required: 'La contraseña es obligatoria',
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*[\W_]).+$/,
                        message: 'Debe contener al menos una mayúscula y un carácter especial',
                    },
                    minLength: {
                        value: 8,
                        message: 'Debe tener al menos 8 caracteres'
                    }
                })}
            />
            {
                errors.password && (<p className="text-red-500 text-xs">{errors.password.message}</p>)
            }

            <p className="my-5">
                <span className="text-xs">
                    Al hacer clic en &quot;Crear cuenta&quot;, acepta nuestros
                    <Link href="/politics/terms" className="underline"> términos y condiciones</Link> y
                    <Link href="/politics/data" className="underline"> políticas de tratamiento de datos</Link>
                </span>
            </p>

            <span className='text-red-500 text-sm mb-2'>{errorMessage}</span>

            <button
                disabled={
                    isPending ? true : false
                }
                className={
                    clsx(
                        "cursor-pointer mb-5",
                        {
                            "btn-primary": !isPending,
                            "btn-disabled": isPending
                        })
                }>
                Crear cuenta
            </button>

            {/* divisor line */}
            {/* <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <Image
                    src="/imgs/Pinata-burrito.png"
                    alt="Burrito"
                    width={60}
                    height={60}
                    className='mx-10'
                />
                <div className="flex-1 border-t border-gray-500"></div>
            </div> */}

            {
                !isModalAuth
                    ? (
                        <Link
                            href="/auth/login"
                            className="btn-secondary text-center cursor-pointer">
                            Ingresar
                        </Link>
                    )
                    : (
                        <button
                            onClick={() => setModalAuth?.()}
                            className="btn-secondary text-center cursor-pointer">
                            Ingresar
                        </button>
                    )
            }
        </form>
    )
}
