'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/interfaces/product.interface';
import { currencyFormat } from '@/utils/currencyFormat';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import clsx from 'clsx';

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);

    return (
        <Link href={`/product/${product.slug}`}
            className='text-center rounded-md overflow-hidden fade-in p-3
                     hover:shadow-xl hover:shadow-purple-300 hover:cursor-pointer'>

            <div className='relative m-auto w-40 h-40 sm:w-50 sm:h-50 rounded overflow-hidden'
                onMouseEnter={() => setDisplayImage(product.images[1])}
                onMouseLeave={() => setDisplayImage(product.images[0])}
            >
                {/* First image */}
                <ProductImage
                    src={product.images[0]}
                    alt={product.title}
                    width={800}
                    height={800}
                    className={
                        clsx(
                            'absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-500',
                            {
                                'opacity-100': displayImage === product.images[0],
                                'opacity-0': displayImage === product.images[1],
                            }
                        )
                    }
                />

                {/* Second image */}
                <ProductImage
                    src={product.images[1]}
                    alt={product.title}
                    width={800}
                    height={800}
                    className={
                        clsx(
                            'absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-500',
                            {
                                'opacity-100': displayImage === product.images[1],
                                'opacity-0': displayImage === product.images[0],
                            }
                        )
                    }
                />
            </div>


            <div className='mt-3'>
                <div className='hover:text-primary group'>
                    <p className='sm:truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-wrap transition-all duration-300'>
                        {product.title}
                    </p>
                </div>
                <p className='font-bold mt-2'>{currencyFormat(product.price)}</p>
                <button className='btn-primary mt-2'>
                    Ver más
                </button>
            </div>
        </Link>
    )
}
