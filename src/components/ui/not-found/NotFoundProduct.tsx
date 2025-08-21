import { titleFont } from '@/config/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const NotFoundProduct = () => {
    return (
        <div className='flex flex-col-reverse md:flex-row min-h-[500px] w-full justify-center items-center align-middle'>
            <div className='text-center px-5 mx-5'>
                <h2 className={`${titleFont.className} antialiased text-5xl`}>Whoops!</h2>
                <p className='font-semibold text-xl'>
                    No tenemos ese producto en nuestro catálogo
                </p>
                <p className='font-light'>
                    <span>Puedes regresar al </span>
                    <Link href="/" className='font-normal hover:underline transition-all'>
                        Inicio
                    </Link>
                </p>
            </div>
            <div className='px-5 mx-5'>
                <Image src="/imgs/Pinata-burrito.png"
                    alt='Pinata Burrito'
                    className='p-5 sm:p-0'
                    width={400}
                    height={400} />
            </div>

        </div>
    )
}
