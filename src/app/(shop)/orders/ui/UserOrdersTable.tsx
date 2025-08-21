'use client';

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaRegCalendarCheck } from "react-icons/fa";
import { format, startOfDay } from "date-fns";
import { getAllOrders } from "@/actions/order/get-all-orders";
import { IoCardOutline } from "react-icons/io5"
import { Order } from "@/interfaces/order.interface";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { redirect } from "next/navigation";
import DatePicker from "react-datepicker";
import Link from "next/link"
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { useSearchUserOrdersStore } from "@/store/orders/search-user-orders-store";

interface Props {
    page: number;
    className: string;
}

type Inputs = {
    take: number;
    searching: string;
    isPaid: string;
    startDate: Date;
    endDate: Date;
}

export const UserOrdersTable = ({ page, className }: Props) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [orders, setOrders] = useState<Order[]>();
    const [totalPages, setTotalPages] = useState<number>(1);
    const [countOrders, setCountOrders] = useState<number>(0);
    const { searchUserOrders, setSearchUserOrders } = useSearchUserOrdersStore(state => state);
    const { register, handleSubmit, reset, control } = useForm<Inputs>({
        defaultValues: searchUserOrders,
        mode: "onSubmit"
    });
    const getInitialOrders = useCallback(async (data?: Inputs) => {

        const { ok, orders = [], totalPages, totalCount } = await getAllOrders({ page, ...data, isAdminPage: false });

        if (!ok) {
            redirect('/');
        }

        if (orders) {
            if (totalPages === 0) {
                setTotalPages(1);
            }
            else {
                setTotalPages(totalPages!);
                setCountOrders(totalCount!);
            }

            setOrders(orders);
        }
    }, [page]);

    useEffect(() => {
        reset(searchUserOrders);
        getInitialOrders(searchUserOrders);
    }, [page, reset, searchUserOrders, getInitialOrders]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        setErrorMessage('');
        const { startDate, endDate } = data;

        if (startDate > endDate) {
            setErrorMessage('La fecha inicial no puede ser mayor que la final');
            return;
        }

        getInitialOrders(data);
        setSearchUserOrders(data);
        redirect("/orders?page=1")
    }

    return (
        <div className={`${className}`}>
            {
                errorMessage && <p className="text-primary my-5" >{errorMessage}</p>
            }

            <form onSubmit={handleSubmit(onSubmit)} className="flex sm:flex-row flex-col">
                <div className="block relative">
                    <select
                        {...register('take', { required: 'La cantidad de datos es obligatoria' })}
                        className="appearance-none h-full rounded-l border-l border-y block w-full bg-white border-gray-400 text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>

                <div className="block relative">
                    <select
                        {...register('isPaid')}
                        className="appearance-none h-full border block w-full bg-white border-gray-400 text-gray-700 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value="all">[filtrar estado]</option>
                        <option value="true">Pagada</option>
                        <option value="false">No Pagada</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
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
                            className="appearance-none  sm:rounded-l-none border border-gray-400 border-b block pl-4 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />

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
                        className="appearance-none sm:rounded-l-none border rounded-r border-l-0 border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
                <div className="flex">
                    <button type="submit" className="bg-primary py-1 px-3 rounded text-white hover:bg-secondary ml-5 cursor-pointer">
                        Buscar
                    </button>
                </div>
            </form>
            <div className="text-gray-500 my-5">Se encontraron {countOrders} ordenes.</div>
            <table className={`w-full my-0 align-middle text-dark border-neutral-200`}>
                <thead className="align-bottom">
                    <tr className='font-bold text-[0.95rem] text-gray-300'>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                            #ID
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                            NOMBRE COMPLETO
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                            ESTADO
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                            FECHA
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                            HORA
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                            OPCIONES
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.map(order => {
                            return (
                                <tr key={order.id} className="border-b border-dashed last:border-b-0 transition duration-300 ease-in-out hover:bg-gray-100">

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order?.code}</td>
                                    <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                        {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                                    </td>
                                    <td className="flex items-center text-sm  text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                        {
                                            order.isPaid ?
                                                (
                                                    <>
                                                        <IoCardOutline className="text-green-800" />
                                                        <span className='mx-2 text-green-800'>Pagada</span>
                                                    </>
                                                ) :
                                                (
                                                    <>
                                                        <IoCardOutline className="text-red-800" />
                                                        <span className='mx-2 text-red-800'>No Pagada</span>
                                                    </>
                                                )
                                        }
                                    </td>
                                    <td className="text-sm text-gray-900 font-semibold px-6">
                                        {format(order.createdAt, "dd/MM/yyyy")}
                                    </td>
                                    <td className="text-sm text-gray-900 font-semibold px-6">
                                        {format(order.createdAt, "HH:mm:ss")}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        <Link href={`/orders/${order.code}`} className="hover:underline">
                                            Ver orden
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}

                </tbody>
            </table>
            <Pagination totalPages={totalPages!} />
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
        <div className="block relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <FaRegCalendarCheck className='text-gray-400' />
            </span>
            <button
                type="button"
                className="appearance-none border border-l-0 border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                onClick={onClick}
                ref={ref}
            >
                {value || placeHolder}
            </button>
        </div>
    )
);

CustomDateInput.displayName = "CustomDateInput";