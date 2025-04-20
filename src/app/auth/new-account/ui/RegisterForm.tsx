'use client';

import { login } from '@/actions/auth/login';
import { registerUser } from '@/actions/auth/register';
import clsx from 'clsx';
import Image from 'next/image';
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

    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setErrorMessage('');
        const { name, email, password } = data;
        const resp = await registerUser(name, email, password);

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        await login(email.toLowerCase(), password);
        window.location.replace('/');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

            {/* {
                errors.name?.type === 'required' && (
                    <span className='text-red-500'>* El nombre es obligatorio</span>
                )
            } */}

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                autoFocus
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />

            <label htmlFor="text">Nombre completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text"
                {...register('name', { required: true })}
            />

            <label htmlFor="password">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />

            <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                    Al hacer clic en &quot;Crear cuenta&quot;, acepta nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">políticas de privacidad</a>
                </span>
            </p>

            <span className='text-red-500'>{errorMessage}</span>

            <button
                className="btn-primary cursor-pointer">
                Crear cuenta
            </button>

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
