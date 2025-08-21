import { clsx } from 'clsx';
import React from 'react'

interface Props {
    selectedSize: string | undefined;
    availableSizes: string[] | undefined;
    onSizeChanged: (size: string) => void;
}


export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {
    return (
        <div className='my-5'>
            <h3 className='font-bold mb-4'>Tallas disponibles</h3>
            <div className='flex'>
                {
                    availableSizes?.map(size => (
                        <button
                            onClick={() => onSizeChanged(size)}
                            key={size}
                            className={
                                clsx(
                                    "mx-2 hover:underline text-lg cursor-pointer",
                                    {
                                        "underline": size === selectedSize
                                    }
                                )
                            }>
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
