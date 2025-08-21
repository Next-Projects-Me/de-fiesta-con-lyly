'use client';

import { Color } from '@/interfaces/color.interface';
import { createColor } from '@/actions/features/create-color';
import { createPortal } from 'react-dom';
import { createSize } from '@/actions/features/create-size';
import { FaCheckCircle, FaPlus, FaPlusCircle } from 'react-icons/fa';
import { SketchPicker } from "react-color";
import { Title } from '@/components/ui/title/Title'
import { toast, Toaster } from 'sonner';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react'
import { Size } from '@/interfaces/feature.interface';

interface Props {
    colors: Color[];
    sizes: Size[];
}

export const ProductFeaturesForm = ({ colors, sizes }: Props) => {

    const [isChoosingColor, setIsChoosingColor] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [currentColor, setCurrentColor] = useState("");
    const [currentSize, setCurrentSize] = useState("");
    const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const pickerRef = useRef<HTMLDivElement | null>(null);

    // Abre el panel al lado del botón
    const togglePicker = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPickerPosition({
                top: rect.top + window.scrollY,
                left: rect.right + 10 + window.scrollX,
            });
            setShowPicker((prev) => !prev);
        }
    };

    const onSaveColor = async () => {
        setIsChoosingColor(false);

        const resp = await createColor(currentColor);
        messageBox(resp.ok, resp.message);
    }

    const handleSavingColor = () => {
        togglePicker();
        setIsChoosingColor(true);
    }

    const onSaveSize = async () => {

        if (!currentSize) {
            toast.warning("La talla no puede ir vacía");
            return;
        }

        const resp = await createSize(currentSize);
        messageBox(resp.ok, resp.message);
        setCurrentSize("");
    }

    // Cerrar al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e: PointerEvent) => {
            const target = e.target as Node;
            if (
                showPicker &&
                !buttonRef.current?.contains(target) &&
                !pickerRef.current?.contains(target)
            ) {
                setShowPicker(false);
            }
        };

        document.addEventListener("pointerdown", handleClickOutside);
        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, [showPicker]);

    const messageBox = (ok: boolean, message: string) => {
        if (!ok) {
            toast.error(message);
        } else {
            toast.success(message);
        }
    }

    return (
        <div className='border-interface p-5 mx-5 sm:mx-0 mt-10'>
            <Toaster richColors position="bottom-right" />
            <Title title="Características de productos" />
            <p>Colores</p>
            <div className='flex flex-wrap my-3'>
                {
                    colors.map(color => (
                        <div key={color.id}
                            className={
                                clsx(
                                    "flex justify-center items-center relative group",
                                )
                            } >
                            <button
                                style={{ background: color.name }}
                                className="w-9 h-9 m-1 text-lg rounded-full focus:outline-none border border-gray-300"
                            >
                                {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div onClick={() => deleteColor(color.id, color.color)} className='w-7 h-7 bg-white rounded-full flex items-center justify-center'>
                                        <FaTrashAlt className="text-black text-sm bg-white" />
                                    </div>
                                </div> */}
                            </button>
                        </div>
                    ))
                }
                {
                    isChoosingColor &&
                    <div className='flex flex-wrap'>
                        <div style={{ background: currentColor }} className='w-9 h-9 m-1 text-lg rounded-full focus:outline-none border border-gray-300'>
                        </div>
                        <button
                            onClick={onSaveColor}
                            className='flex items-center m-1 cursor-pointer'>
                            <FaCheckCircle className='text-4xl text-green-700' />
                        </button>
                    </div>
                }
                <button ref={buttonRef}
                    onClick={handleSavingColor}
                    className='flex items-center m-1 cursor-pointer'>
                    <FaPlusCircle className='text-4xl hover:text-rose-500' />
                </button>
                {showPicker &&
                    createPortal(
                        <div
                            ref={pickerRef}
                            style={{
                                position: "absolute",
                                top: pickerPosition.top,
                                left: pickerPosition.left,
                                zIndex: 3,
                            }}
                        >
                            <SketchPicker
                                color={currentColor}
                                onChange={(e) => setCurrentColor(e.hex)}
                                disableAlpha
                            />
                        </div>,
                        document.body
                    )}

            </div>

            <p>Tallas</p>
            <div className='flex flex-wrap my-3'>
                {
                    sizes.map(size => (
                        <div
                            key={size.id}
                            className='p-2 border rounded-md mr-2 mb-2 w-14 flex justify-center items-center relative group'
                        >
                            <button
                                // onClick={() => onSizeChanged(size.size)}
                                className={
                                    clsx(
                                        " transition-all text-center bg-white",
                                    )
                                }>
                                <p >{size.name}</p>
                                {/* <div onClick={() => deleteSize(size.id, size.size)} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <FaTrashAlt className="text-black text-xl" />
                                </div> */}
                            </button>
                        </div>
                    ))
                }
                <div onClick={onSaveSize} className='flex items-center justify-center p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer bg-black hover:bg-rose-500'>
                    <FaPlus className='text-2xl text-white' />
                </div>
                <div>
                    <input onChange={(e) => setCurrentSize(e.target.value)}
                        value={currentSize}
                        className='border-b-2 border-rose-500 focus:outline-0 h-10' />
                </div>
            </div>
        </div>
    )
}
