'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/interfaces/product.interface';
import { currencyFormat } from '@/utils/currencyFormat';

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);

    return (
        <div className='rounded-md overflow-hidden fade-in p-3 hover:shadow-black-400 hover:shadow-2xl'>
            <Link href={`/product/${product.slug}`} className='flex justify-center' >
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className='w-full h-80 sm:w-64 sm:h-64 object-cover rounded'
                    width={500}
                    height={500}
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />
            </Link>

            <div className='mt-3'>
                <Link
                    className='hover:text-primary'
                    href={`/product/${product.slug}`} >
                    {product.title}
                </Link>
                <p className='font-bold mt-2'>{currencyFormat(product.price)}</p>
                {/* <div className='flex justify-between'>
                    <p className='font-bold'>{currencyFormat(product.price)}</p>
                    <button className='text-gray-500 hover:text-primary text-2xl cursor-pointer'>
                        <FaPlusCircle />
                    </button>
                </div> */}
            </div>
        </div>
    )
}
