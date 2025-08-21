'use client';

import { useState } from "react";
import { ProductImage } from "../../product-image/ProductImage";


interface Props {
    selectedImage: string;
    closeModal: () => void;
    width: number;
    height: number;
}

export const ImageModal = ({ selectedImage, closeModal, width, height }: Props) => {

    const [zoomed, setZoomed] = useState(false);

    const toggleZoom = () => {
        setZoomed((prev) => !prev);
    };

    return (
        <div>
            <div className='fixed top-0 left-0 w-screen h-screen z-30 bg-black opacity-30' />
            <div className='fade-in fixed top-0 left-0 w-screen h-screen z-40 backdrop-filter backdrop-blur-sm' />
            <div
                className={`fixed inset-0 flex items-center justify-center z-40  transform transition-all duration-300 ${zoomed ? 'scale-150' : 'scale-100'}`}
                onClick={closeModal}
            >
                <div onClick={(e) => e.stopPropagation()} >
                    <ProductImage
                        src={selectedImage}
                        alt={selectedImage}
                        width={width}
                        height={height}
                        className="rounded-lg cursor-zoom-in hover:cursor-zoom-out"
                        onClick={toggleZoom}
                    />
                </div>
            </div>
        </div>
    )
}
