'use client';

import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css'

import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";
import { ImageModal } from "./ui/ImageModal";

interface Props {
    images?: string[];
    title?: string;
    className?: string;
}

export const ProductMobileSlideshow = ({ images, title = "Titulo", className }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedImage("");
    };

    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100vw',
                    height: '500px'
                }}
                pagination
                autoplay={{
                    delay: 2500
                }}
                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {
                    images?.map(image => (
                        <SwiperSlide key={image}>
                            <Image
                                className="object-fill"
                                width={600}
                                height={500}
                                src={`/products/${image}`}
                                alt={title}
                                onClick={() => handleImageClick(image)}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {isOpen && (
                <ImageModal
                    selectedImage={selectedImage}
                    closeModal={closeModal}
                    width={300}
                    height={300}
                />
            )}
        </div>
    )
}
