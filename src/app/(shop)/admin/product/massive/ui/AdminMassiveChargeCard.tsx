'use client';

import { LoadingSpinner } from '@/components/ui/loading-spinner/Loading';
import { Pagination } from '@/components/ui/pagination/Pagination';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
    // page: number;
    // subcategories: Subcategory[];
    products: string[] | undefined;
}

type Inputs = {
    take: number;
    subcategory: number;
    searching: string;
}

export const AdminMassiveChargeCard = ({ products }: Props) => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [totalPages] = useState<number>(1);
    // const [products, setProducts] = useState<Product[]>();
    // const { searchProducts, setProductSearch } = useSearchProductStore(state => state);
    const { register, handleSubmit } = useForm<Inputs>();

    // const getInitialProducts = useCallback(async (data?: Inputs) => {

    //     const { ok, products = [], totalPages } = await getAllProductsWithImages({
    //         page, ...data, isAdminPage: true
    //     });

    //     if (!ok) router.push('/');

    //     if (products) {
    //         if (totalPages === 0) {
    //             setTotalPages(1);
    //         }
    //         else {
    //             setTotalPages(totalPages!);
    //         }

    //         setProducts(products);
    //     }
    // }, [page, router])

    useEffect(() => {
        // reset(searchProducts);
        // getInitialProducts(searchProducts);
        setLoaded(true);
    }, []);

    // const onGetToken = async () => {
    //     const token = await getMassiveProduct("TG-68a75098d9d4c5000148ad4e-362171082");
    //     console.log(token);
    // }

    const onSubmit: SubmitHandler<Inputs> = async () => {
        // setLoaded(false);
        // await getInitialProducts(data);
        // setProductSearch(data);
        router.push("/admin/product/massive?page=1")
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap items-center justify-between gap-2 sm:m-0 px-5 sm:px-0">
                <div className='flex flex-wrap items-center gap-2'>
                    <div className='flex gap-2 w-full sm:w-fit '>
                        <div className="p-2 border rounded-md bg-gray-200 flex w-full sm:w-fit">
                            <select
                                {...register('take', { required: 'La cantidad de datos es obligatoria' })}
                                className="w-full sm:w-fit h-full outline-0">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-2 border rounded-md bg-gray-200 w-full sm:w-fit">
                        <select
                            {...register('subcategory')}
                            className="h-full outline-0 w-full sm:w-fit">
                            <option value={0}>[filtrar Subcategoría]</option>
                            {/* {
                                subcategories.map(sub => (
                                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                                ))
                            } */}
                        </select>
                    </div>
                    <div className="flex items-center h-10 p-2 border rounded-md bg-gray-200 w-full sm:w-fit">
                        <span className="h-full flex items-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                <path
                                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                </path>
                            </svg>
                        </span>
                        <input
                            {...register('searching')}
                            placeholder="Search"
                            className="h-full outline-0 w-full" />
                    </div>
                    <div className='flex flex-row w-full sm:w-fit gap-2'>
                        <button type="submit"
                            className="btn-primary w-full rounded text-white hover:bg-secondary cursor-pointer ">
                            Cargar Productos
                        </button>
                        <Link href="/admin/product/new"
                            className='block sm:hidden w-full btn-primary text-center rounded text-white hover:bg-secondary cursor-pointer'>
                            Obtener Token
                        </Link>
                    </div>
                    {/* <Link href="/admin/product/massive"
                        className='block sm:hidden w-full btn-primary text-center rounded text-white hover:bg-secondary cursor-pointer'>
                        Carga Masiva
                    </Link> */}
                </div>
                <div className='flex gap-3'>
                    {/* <button onClick={onGetToken}
                        className='hidden sm:block btn-primary text-center rounded text-white hover:bg-secondary cursor-pointer'>
                        Obtener Token
                    </button> */}
                    {/* <Link href="/admin/product/new"
                        className='hidden sm:block btn-primary text-center rounded text-white hover:bg-secondary cursor-pointer'>
                        Cargar Productos
                    </Link> */}
                </div>
            </form>
            {
                !loaded && <LoadingSpinner className="mt-10" />
            }
            {
                products ? <div>{products}</div> : <p>No hay productos</p>
            }
            {
                // loaded &&
                // <div className="px-5 sm:px-0 mt-5 text-sm sm:text-base">
                //     {
                //         products?.length === 0
                //             ? <div className="border-interface text-gray-500 p-5">Se encontraron {products?.length} productos.</div>
                //             : <div className="border-interface grid xl:grid-cols-2 w-full">
                //                 {
                //                     products?.map(product => (
                //                         <div key={product.id} className="p-5">
                //                             <div className="flex flex-row justify-between border-b-2 border-gray-200 w-full h-full">
                //                                 <div className="flex flex-col sm:flex-row gap-4 mb-5 w-full">
                //                                     <div className='flex flex-col'>
                //                                         <Link href={`/product/${product.slug}`} className='w-full sm:w-fit'>
                //                                             <ProductImage
                //                                                 src={product.ProductImage[0]?.url}
                //                                                 width={400}
                //                                                 height={400}
                //                                                 alt={product.title}
                //                                                 className='w-70 h-70 sm:w-40 sm:h-40 object-fill rounded'
                //                                             />
                //                                         </Link>
                //                                         <Link href={`/admin/product/${product.slug}`}
                //                                             className='btn-primary w-full mt-3 text-center'>
                //                                             Editar
                //                                         </Link>
                //                                     </div>
                //                                     <div className='sm:w-[40%]'>
                //                                         <label className='font-bold'>Titulo:</label>
                //                                         <p className="mb-2">{product.title}</p>

                //                                         <label className='font-bold'>Precio:</label>
                //                                         <p className="mb-2">{currencyFormat(product.price)}</p>

                //                                         <label className='font-bold'>Stock:</label>
                //                                         {
                //                                             product.inStock > 0
                //                                                 ? <p className="">{product.inStock}</p>
                //                                                 : <p className="mb-2 text-gray-400">Sin existencias</p>
                //                                         }

                //                                     </div>
                //                                     <div className=''>
                //                                         <label className='font-bold'>Tallas:</label>
                //                                         {
                //                                             product.sizes!.length > 0
                //                                                 ? <p className="mb-2">{product.sizes?.join(', ')}</p>
                //                                                 : <p className="mb-2 text-gray-400">No aplica</p>
                //                                         }

                //                                         <label className='font-bold'>Números:</label>
                //                                         {
                //                                             product.numbers!.length > 0
                //                                                 ? <p className="mb-2">{product.numbers?.join(', ')}</p>
                //                                                 : <p className="mb-2 text-gray-400">No aplica</p>
                //                                         }

                //                                         <label className='font-bold'>Colores:</label>
                //                                         {
                //                                             product.colors!.length > 0
                //                                                 ? (
                //                                                     <div className='flex mt-2'>
                //                                                         {
                //                                                             product.colors?.map(color => (
                //                                                                 <div
                //                                                                     key={color}
                //                                                                     className="w-5 h-5 rounded-full mr-2"
                //                                                                     style={{ background: color }}>
                //                                                                 </div>
                //                                                             ))
                //                                                         }
                //                                                     </div>
                //                                                 )
                //                                                 : <p className="mb-2 text-gray-400">No aplica</p>
                //                                         }

                //                                     </div>
                //                                 </div>
                //                             </div>
                //                         </div>
                //                     ))
                //                 }
                //             </div>
                //     }
                // </div>
            }
            {
                loaded &&
                <Pagination totalPages={totalPages!} />
            }

        </div>
    )
}
