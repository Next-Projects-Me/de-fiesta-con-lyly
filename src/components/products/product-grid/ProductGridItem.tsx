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
        <Link href={`/product/${product.slug}`}
            className='text-center rounded-md overflow-hidden fade-in p-3 hover:shadow-black-400 hover:shadow-xl hover:cursor-pointer bg-white'>

            <div className='flex justify-center'>
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    width={800}
                    height={800}
                    className='object-contain rounded w-40 h-40 sm:w-60 sm:h-60'
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />
            </div>


            <div className='mt-3'>
                <div className='hover:text-primary group'>
                    <p className='truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-wrap transition-all duration-300'>
                        {product.title}
                    </p>

                    {/* {
                        product.title.length > 23
                            ? product.title.substring(0, 23) + "..."
                            : product.title
                    } */}
                </div>
                <p className='font-bold mt-2'>{currencyFormat(product.price)}</p>
            </div>
        </Link>
    )
}
