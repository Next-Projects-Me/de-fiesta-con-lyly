'use client';

import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import './slideshow.css';
import { ImageModal } from "./ui/ImageModal";
import { ProductImage } from "../product-image/ProductImage";

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
        <div className={`${className} flex-col h-full place-items-end `}>
            <div className="place-items-end  w-full ">
                <div className="md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] rounded">
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
                                    <ProductImage
                                        className="object-contain rounded-lg cursor-zoom-in"
                                        width={800}
                                        height={800}
                                        src={image}
                                        alt={title}
                                        onClick={() => handleImageClick(image)}
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>

            <div className="place-items-end w-full h-[150px]">
                <div className="md:w-[350px] lg:w-[500px] xl:w-[600px]">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={2}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper md:h-[86px] lg:h-[120px] xl:h-[150px]"
                    >
                        {
                            images?.map(image => (
                                <SwiperSlide key={image} className="w-40">
                                    <ProductImage
                                        className="rounded-lg"
                                        width={800}
                                        height={800}
                                        src={image}
                                        alt={title} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
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
                                <ProductImage
                                    className="object-contain rounded cursor-zoom-in"
                                    width={800}
                                    height={800}
                                    src={image}
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
                                <ProductImage
                                    className="rounded-lg object-fill"
                                    width={900}
                                    height={900}
                                    src={image}
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
