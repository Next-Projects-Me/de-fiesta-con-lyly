import Image from 'next/image'
import React from 'react'

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
    width: number;
    height: number;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const ProductImage = ({ src, alt, className, style, width, height, onClick, onMouseEnter, onMouseLeave }: Props) => {

    const localSrc = (src) ? src.startsWith('http')
        ? src
        : `/products/${src}`
        : '/imgs/placeholder.jpg';


    return (
        <Image
            src={localSrc}
            width={width}
            height={height}
            alt={alt}
            className={className}
            style={style}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    )
}
