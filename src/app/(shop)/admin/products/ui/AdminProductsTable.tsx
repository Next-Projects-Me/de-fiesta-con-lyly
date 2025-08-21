'use client';

import { getAllProductsWithImages } from '@/actions/product/get-all-products-with-images';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { Subcategory } from '@/interfaces/category.interface';
import { Product } from '@/interfaces/product.interface';
import { useSearchProductStore } from '@/store/products/search-products-store';
import { currencyFormat } from '@/utils/currencyFormat';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';


interface Props {
    page: number;
    subcategories: Subcategory[];
}

type Inputs = {
    take: number;
    subcategory: number;
    searching: string;
}

export const AdminProductsTable = ({ page, subcategories }: Props) => {

    const router = useRouter();
    const [products, setProducts] = useState<Product[]>();
    const [totalPages, setTotalPages] = useState<number>(1);
    const [countProducts, setCountProducts] = useState<number>(0);
    const { searchProducts, setProductSearch } = useSearchProductStore(state => state);
    const { register, handleSubmit, reset } = useForm<Inputs>();

    const getInitialProducts = useCallback(async (data?: Inputs) => {

        const { ok, products = [], totalPages, totalCount } = await getAllProductsWithImages({
            page, ...data, isAdminPage: true
        });

        if (!ok) router.push('/');

        if (products) {
            if (totalPages === 0) {
                setTotalPages(1);
                setCountProducts(0);
            }
            else {
                setTotalPages(totalPages!);
                setCountProducts(totalCount!);
            }
            setProducts(products);
        }
    }, [page, router])

    useEffect(() => {
        reset(searchProducts);
        getInitialProducts(searchProducts);
    }, [page, reset, searchProducts, getInitialProducts]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await getInitialProducts(data);
        setProductSearch(data);
        router.push("/admin/products?page=1")
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="my-2 flex sm:flex-row justify-between flex-col">
                <div className='flex flex-row mb-1 sm:mb-0'>
                    <div className="block relative">
                        <select
                            {...register('take', { required: 'La cantidad de datos es obligatoria' })}
                            className="appearance-none h-full rounded-l border-l border-y block w-full bg-white border-gray-400 text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            {...register('subcategory')}
                            className="appearance-none h-full border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option value={0}>[filtrar Subcategoría]</option>
                            {
                                subcategories.map(sub => (
                                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                                ))
                            }
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    <div className="block relative">
                        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                <path
                                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                </path>
                            </svg>
                        </span>
                        <input
                            {...register('searching')}
                            placeholder="Search"
                            className="h-full appearance-none rounded border border-l-0 rounded-l-none border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                    </div>
                    <div className="flex">
                        <button type="submit" className="bg-primary py-1 px-3 rounded text-white hover:bg-secondary ml-5 cursor-pointer">
                            Buscar
                        </button>
                    </div>
                </div>
                <Link href="/admin/product/new" className='bg-primary py-1.5 px-3 text-center rounded text-white hover:bg-secondary ml-5 cursor-pointer'>
                    Crear Producto
                </Link>
            </form>

            <div className="text-gray-500 my-5">Se encontraron {countProducts} productos.</div>
            <div className="mb-10">
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                        <tr className='font-bold text-[0.95rem] text-gray-300'>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                #IMAGEN
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                TÍTULO
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                PRECIO
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                TALLAS
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                COLORES
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                NÚMEROS
                            </th>
                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                INVENTARIO
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map(product => (
                                <tr key={product.id} className="border-b border-dashed last:border-b-0 transition duration-300 ease-in-out hover:bg-gray-100">

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={`/product/${product.slug}`}>
                                            <ProductImage
                                                src={product.ProductImage[0]?.url}
                                                width={80}
                                                height={80}
                                                alt={product.title}
                                                className='w-20 h-20 object-cover rounded'
                                            />
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-semibold px-6 py-4">
                                        <Link href={`/admin/product/${product.slug}`} className='hover:underline'>
                                            {product.title}
                                        </Link>
                                    </td>
                                    <td className="text-sm font-bold text-gray-900 px-6 py-4 ">
                                        {currencyFormat(product.price)}
                                    </td>
                                    <td className="text-sm  text-gray-900 font-semibold px-6 py-4">
                                        {product.sizes?.join(', ')}
                                    </td>
                                    <td className="text-sm  text-gray-900 font-semibold px-6 py-4">
                                        <div className='flex'>
                                            {
                                                product.colors?.map(color => (
                                                    <div
                                                        key={color}
                                                        className="w-5 h-5 rounded-full ml-2"
                                                        style={{ background: color }}>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </td>
                                    <td className="text-sm  text-gray-900 font-semibold px-6 py-4">
                                        {product.numbers?.join(', ')}
                                    </td>
                                    <td className="text-sm  text-gray-900 font-semibold px-6 py-4">
                                        {product.inStock}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Pagination totalPages={totalPages!} />
            </div>
        </div>
    )
}
