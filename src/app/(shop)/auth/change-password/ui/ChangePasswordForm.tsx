'use client';

import { changePassword } from '@/actions/auth/recovery';
import { MdVpnKey, MdVpnKeyOff } from 'react-icons/md';
import { sleep } from '@/utils/sleep';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Inputs = {
    newPassword: string;
    confirmedPassword: string;
}

export const ChangePasswordForm = () => {

    const params = useSearchParams();
    const token = params.get('token')!;

    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setErrorMessage('');
        setMessage('');

        const resp = await changePassword(token, data.newPassword, data.confirmedPassword);

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        setMessage(resp.message);

        //sleep(2);
        // window.location.replace('/auth/login');
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col">

            <label htmlFor="password">Nueva contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                autoFocus
                {...register('newPassword', { required: true, minLength: 8 })}
            />

            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded"
                type="password"
                {...register('confirmedPassword', { required: true, minLength: 8 })}
            />

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
                className="btn-primary text-center cursor-pointer flex justify-center mb-3">
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

