'use client';

import { changePassword } from '@/actions/auth/recovery';
import { MdVpnKey, MdVpnKeyOff } from 'react-icons/md';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { sleep } from '@/utils/sleep';
import clsx from 'clsx';

type Inputs = {
    newPassword: string;
    confirmedPassword: string;
}

function ChangePassword() {

    const params = useSearchParams();
    const token = params.get('token')!;

    const [message, setMessage] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setIsPending(true);
        setErrorMessage('');
        setMessage('');

        const resp = await changePassword(token, data.newPassword, data.confirmedPassword);

        if (!resp.ok) {
            setIsPending(false);
            setErrorMessage(resp.message);
            return;
        }

        setMessage(resp.message);
        setIsPending(false);

        sleep(10);
        window.location.replace('/');
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col">

            <label htmlFor="password">Nueva contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded"
                type="password"
                autoFocus
                {...register('newPassword', {
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
                errors.newPassword && (<p className="text-red-500 text-xs">{errors.newPassword.message}</p>)
            }

            <label htmlFor="confirm-password" className='mt-3'>Confirmar Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded"
                type="password"
                {...register('confirmedPassword', {
                    required: 'La confirmación de la contraseña es obligatoria',
                    validate: {
                        checkSamePassword: async (confirmedPassword, { newPassword }) => {
                            if (confirmedPassword !== newPassword) {
                                return 'Las contraseñas no coinciden'
                            }
                        },
                    }
                })}
            />
            {
                errors.confirmedPassword && (<p className="text-red-500 text-xs">{errors.confirmedPassword.message}</p>)
            }

            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {
                    (errorMessage && !message) && (
                        <div className='flex flex-row mb-2'>
                            <MdVpnKeyOff className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">&nbsp;{errorMessage}</p>
                        </div>
                    )
                }

                {
                    (message && !errorMessage) && (
                        <div className='flex flex-row mb-2'>
                            <MdVpnKey className="h-5 w-5 text-green-700" />
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
                Restablecer
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


export const ChangePasswordForm = () => {
    return (
        <Suspense>
            <ChangePassword />
        </Suspense>
    )
}

