import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const ChangePasswordForm = () => {
    return (
        <form
            // action={formAction} 
            className="flex flex-col">

            <label htmlFor="password">Nueva contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name="password" />

            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded"
                type="password"
                name="password" />

            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {/* {
                    state && (
                        <div className='flex flex-row mb-2'>
                            <IoInformationOutline className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">Credenciales no son correctas</p>
                        </div>
                    )} */}
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
