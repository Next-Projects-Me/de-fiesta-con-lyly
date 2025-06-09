'use client';

import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import './slideshow.css';
import { ImageModal } from "./ui/ImageModal";

interface Props {
    images?: string[];
    title?: string;
    className?: string;
}

export const ProductSlideshow = ({ images, title = "Titulo", className }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedImage("");
    };


    return (
        <div className={`${className} flex-col h-full place-items-center`}>
            <div className="w-[600px] h-[600px] rounded">
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    } as React.CSSProperties
                    }
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                        swiper: thumbsSwiper
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    className="w-full h-full"
                >
                    {
                        images?.map(image => (
                            <SwiperSlide key={image} className="flex justify-center">
                                <Image
                                    className="object-contain rounded cursor-zoom-in"
                                    width={800}
                                    height={800}
                                    src={`/products/${image}`}
                                    alt={title}
                                    onClick={() => handleImageClick(image)}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

            <div className="w-full h-[150px]">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={2}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper w-[600px] h-full"
                >
                    {
                        images?.map(image => (
                            <SwiperSlide key={image}>
                                <Image
                                    className="rounded-lg object-fill"
                                    width={900}
                                    height={900}
                                    src={`/products/${image}`}
                                    alt={title} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

            </div>

            {
                isOpen && (
                    <ImageModal
                        selectedImage={selectedImage}
                        closeModal={closeModal}
                        width={500}
                        height={500}
                    />
                )}

        </div>
    )
}
