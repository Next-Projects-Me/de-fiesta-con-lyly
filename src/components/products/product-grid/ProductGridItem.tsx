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
        <div className='text-center rounded-md overflow-hidden fade-in p-3 hover:shadow-black-400 hover:shadow-2xl'>

            <Link className='flex justify-center'
                href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    width={800}
                    height={800}
                    className='object-contain rounded w-40 h-40 sm:w-60 sm:h-60'
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />
            </Link>


            <div className='mt-3'>
                <Link
                    className='hover:text-primary'
                    href={`/product/${product.slug}`} >
                    {
                        product.title.length > 23
                            ? product.title.substring(0, 23) + "..."
                            : product.title
                    }
                </Link>
                <p className='font-bold mt-2'>{currencyFormat(product.price)}</p>
            </div>
        </div>
    )
}
