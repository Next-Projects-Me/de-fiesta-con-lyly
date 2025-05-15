'use client';

import { recoveryPassword } from "@/actions/auth/recovery";
import { sleep } from "@/utils/sleep";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuMailCheck, LuMailX } from "react-icons/lu";

type Inputs = {
    email: string;
}

export const RecoveryPasswordForm = () => {

    const [message, setMessage] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setIsPending(true);
        setErrorMessage('');
        setMessage('');

        const resp = await recoveryPassword(data.email);

        if (!resp.ok) {
            setIsPending(false);
            setErrorMessage(resp.message);
            return;
        }

        setIsPending(false);
        setMessage(resp.message);
        sleep(10);
        window.location.replace('/');
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded focus:border-primary"
                type="email"
                autoFocus
                {...register('email', {
                    required: 'El correo es obligatorio',
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Debe ingresar un correo válido. Ejemplo: ejemplo@dominio.com'
                    }
                }
                )}
            />
            {
                errors.email && (<p className="text-red-500 text-xs">{errors.email.message}</p>)
            }

            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {
                    (errorMessage && !message) && (
                        <div className='flex flex-row mb-2'>
                            <LuMailX className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">&nbsp;{errorMessage}</p>
                        </div>
                    )
                }

                {
                    (message && !errorMessage) && (
                        <div className='flex flex-row mb-2'>
                            <LuMailCheck className="h-5 w-5 text-green-700" />
                            <p className="text-sm text-green-700">&nbsp;{message}</p>
                        </div>
                    )
                }
            </div>

            <button
                disabled={
                    isPending ? true : false
                }
                className={
                    clsx(
                        "text-center cursor-pointer flex justify-center mb-3",
                        {
                            "btn-primary": !isPending,
                            "btn-disabled": isPending
                        })
                }>
                Enviar
            </button>

            {/* divisor line */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <Image
                    src="/imgs/Pinata-burrito.png"
                    alt="Burrito"
                    width={60}
                    height={60}
                    className='mx-10' />
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center cursor-pointer">
                Ingresar
            </Link>

        </form>
    )
}