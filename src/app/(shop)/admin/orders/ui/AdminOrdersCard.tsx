'use client';

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaRegCalendarCheck } from "react-icons/fa";
import { format, startOfDay } from "date-fns";
import { getAllOrders } from "@/actions/order/get-all-orders";
import { IoCardOutline } from "react-icons/io5"
import { Order } from "@/interfaces/order.interface";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import Link from "next/link"
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { useSearchAdminOrdersStore } from "@/store/orders/search-admin-orders-store";
import { GenerateConveyorGuide } from "@/pdf/GenerateConveyorGuide";
import { LoadingSpinner } from "@/components/ui/loading-spinner/Loading";

interface Props {
    page: number;
}

type Inputs = {
    take: number;
    searching: string;
    isPaid: string;
    startDate: Date;
    endDate: Date;
}
export const AdminOrdersCard = ({ page }: Props) => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [orders, setOrders] = useState<Order[]>();
    const [totalPages, setTotalPages] = useState<number>(1);
    const { searchAdminOrders, setSearchAdminOrders } = useSearchAdminOrdersStore(state => state);

    const { register, handleSubmit, reset, control } = useForm<Inputs>({
        defaultValues: searchAdminOrders,
        mode: "onSubmit"
    });

    const getInitialOrders = useCallback(async (data?: Inputs) => {

        const { ok, orders = [], totalPages } = await getAllOrders({ page, ...data, isAdminPage: true });

        if (!ok) router.push('/');

        if (orders) {
            if (totalPages === 0) {
                setTotalPages(1);
            }
            else {
                setTotalPages(totalPages!);
            }

            setOrders(orders);
        }
    }, [page, router])

    useEffect(() => {
        reset(searchAdminOrders);
        getInitialOrders(searchAdminOrders);
        setLoaded(true);
    }, [page, reset, searchAdminOrders, getInitialOrders]);


    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setLoaded(false);
        setErrorMessage('');
        const { startDate, endDate } = data;

        if (startDate > endDate) {
            setErrorMessage('La fecha inicial no puede ser mayor que la final');
            return;
        }

        await getInitialOrders(data);
        setSearchAdminOrders(data);

        router.push("/admin/orders?page=1")
    }

    return (
        <div className="block">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap items-center gap-2 sm:m-0 px-5 sm:px-0">
                <div className="flex gap-2 w-full sm:w-fit">
                    <div className="p-2 border rounded-md bg-gray-200 flex w-full sm:w-fit">
                        <select
                            {...register('take', { required: 'La cantidad de datos es obligatoria' })}
                            className="w-full sm:w-fit h-full outline-0">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                    <div className="p-2 border rounded-md bg-gray-200 w-full sm:w-fit">
                        <select
                            {...register('isPaid')}
                            className="h-full outline-0 w-full sm:w-fit">
                            <option value="all">[filtrar estado]</option>
                            <option value="true">Pagada</option>
                            <option value="false">No Pagada</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:flex w-full sm:w-fit">

                    <Controller
                        control={control}
                        name="startDate"
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={field.onChange}
                                maxDate={startOfDay(new Date())}
                                dateFormat="dd/MM/yyyy"
                                customInput={<CustomDateInput placeHolder='Fecha Inicial' />}
                            />

                        )}
                    />
                    <Controller
                        control={control}
                        name="endDate"
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={field.onChange}
                                maxDate={startOfDay(new Date())}
                                dateFormat="dd/MM/yyyy"
                                customInput={<CustomDateInput placeHolder='Fecha Final' />}
                            />
                        )}
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-fit">
                    <div className="flex items-center w-full h-10 p-2 border rounded-md bg-gray-200">
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
                            className="h-full w-full outline-0" />
                    </div>
                    <div className="flex">
                        <button type="submit" className="bg-primary py-1 px-3 sm:ml-5 rounded text-white hover:bg-secondary cursor-pointer">
                            Buscar
                        </button>
                    </div>
                </div>
            </form>
            {
                errorMessage && <p className="text-primary my-5" >{errorMessage}</p>
            }
            {
                !loaded && <LoadingSpinner className="mt-10" />
            }
            {
                loaded &&
                <div className="px-5 sm:px-0 mt-5 text-sm sm:text-base">
                    {
                        orders?.length === 0
                            ? <div className="border-interface text-gray-500 p-5">Se encontraron {orders?.length} ordenes.</div>
                            : <div className="border-interface grid xl:grid-cols-2 w-full">
                                {
                                    orders?.map(order => (
                                        <div key={order.id} className="p-5">
                                            <div className="flex flex-row justify-between border-b-2 border-gray-200 w-full h-full">
                                                <Link href={`/orders/${order.code}`} className="flex flex-row gap-3 sm:gap-0 mb-5 w-full sm:w-fit">
                                                    <div className="flex flex-col justify-start sm:mr-5 w-full sm:w-fit">
                                                        <ProductImage src={order.OrderItem![0].product.ProductImage[0].url}
                                                            alt={order.code}
                                                            width={400}
                                                            height={400}
                                                            className="object-fill w-40 h-40 rounded"
                                                        />
                                                        <GenerateConveyorGuide className="block sm:hidden mt-2 w-40" order={order} />
                                                    </div>
                                                    <div className="flex flex-col items-start">
                                                        <p className="font-bold">{order.code}</p>
                                                        {
                                                            order.isPaid ?
                                                                (
                                                                    <div className="flex justify-center items-center">
                                                                        <IoCardOutline className="text-green-800" />
                                                                        <p className='mx-2 text-green-800'>Pagada</p>
                                                                    </div>
                                                                ) :
                                                                (
                                                                    <div className="flex justify-center items-center">
                                                                        <IoCardOutline className="text-red-800" />
                                                                        <p className='mx-2 text-red-800'>No Pagada</p>
                                                                    </div>
                                                                )
                                                        }

                                                        <label className="font-bold">Nombre: </label>
                                                        <p>{order.OrderAddress?.firstName} {order.OrderAddress?.lastName}</p>

                                                        <label className="font-bold">Fecha: </label>
                                                        <p>{format(order.createdAt, "dd/MM/yyyy")}</p>

                                                        <label className="font-bold">Hora:</label>
                                                        <p>{format(order.createdAt, "HH:mm:ss")}</p>
                                                    </div>
                                                </Link>
                                                <div className="flex-col justify-start items-center hidden sm:flex">
                                                    <Link href={`/orders/${order.code}`}
                                                        className="btn-primary w-full text-center mb-2">
                                                        Ver orden
                                                    </Link>
                                                    <GenerateConveyorGuide order={order} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>
            }
            {
                loaded &&
                <Pagination totalPages={totalPages!} />
            }

        </div>
    )
}

type CustomInputProps = {
    value?: string;
    onClick?: () => void;
    placeHolder: string;
};

const CustomDateInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick, placeHolder }, ref) => (
        <div className="flex justify-center items-center p-2 border rounded-md bg-gray-200 h-10 w-full">
            <span className="h-full flex items-center">
                <FaRegCalendarCheck className='text-black mr-2' />
            </span>
            <button
                type="button"
                className="w-full"
                onClick={onClick}
                ref={ref}
            >
                {value || placeHolder}
            </button>
        </div>
    )
);

CustomDateInput.displayName = "CustomDateInput";