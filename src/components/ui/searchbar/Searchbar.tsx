'use client';

import { IoCloseCircle } from 'react-icons/io5';
import { useUiStore } from '@/store/ui/ui-store';
import React, { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

export const Searchbar = () => {

    const router = useRouter();
    const pathname = usePathname();
    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { isSearchbarOpen, closeSearchbar } = useUiStore();

    useEffect(() => {
        if (isSearchbarOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchbarOpen]);

    const onCloseAndClean = () => {
        if (inputRef.current) inputRef.current.value = '';
        closeSearchbar();
        router.push(pathname);
    }

    const onSearch = async (value: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
            router.push(`/?searching=${value}`);
        }, 500);
    }

    return (
        <div className={
            clsx(
                'fixed right-5 top-38 hidden items-center z-30',
                {
                    'sm:flex': isSearchbarOpen,
                    'hidden': !isSearchbarOpen,
                }
            )
        } >
            <div className="bg-white flex z-30 items-center sm:w-56 md:w-66 lg:w-80 xl:w-[500px] h-12 rounded-lg shadow-lg overflow-hidden border-primary border-2 ">
                <div className="grid place-items-center h-full w-12 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    ref={inputRef}
                    onChange={(e) => onSearch(e.target.value)}
                    className="h-full w-full text-sm text-gray-700 pr-2 focus:border-lime-500 focus:outline-none"
                    type="text"
                    id="search"
                    placeholder="Busca tu producto favorito..." />
            </div>
            {/* <button type='submit' className='btn-primary mx-2 sm:hidden lg:block'>
                Buscar
            </button> */}

            <IoCloseCircle onClick={onCloseAndClean} className='text-2xl ml-2 cursor-pointer text-purple-600' />
        </div>
    )
}
