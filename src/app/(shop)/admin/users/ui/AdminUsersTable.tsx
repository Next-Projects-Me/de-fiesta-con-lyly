'use client';

import { changeUserRole } from '@/actions/users/change-user-rol';
import { changeUserStatus } from '@/actions/users/change-user-status';
import { CheckBox } from '@/components/ui/checkbox/CheckBox';
import { FaUserCircle } from 'react-icons/fa';
import { getAllUsers } from '@/actions/users/get-all-users';
import { Pagination } from '@/components/ui/pagination/Pagination';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { User } from '@/interfaces/user.interface';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

interface Props {
    page: number;
}

type Inputs = {
    take: number;
    rol: number;
    status: string;
    searching: string;
}

export const AdminUsersTable = ({ page }: Props) => {

    const router = useRouter();
    const [users, setUsers] = useState<User[]>();
    const [totalPages, setTotalPages] = useState<number>(1);
    const [countUsers, setCountUsers] = useState<number>(0);
    const [dataForm, setDataForm] = useState<Inputs>();

    const getInitialUsers = useCallback(async (data?: Inputs) => {

        const { ok, users = [], totalPages, totalCount } = await getAllUsers({ page, ...data });

        if (!ok) router.push('/');

        if (users) {
            if (totalPages === 0) {
                setTotalPages(1);
                setCountUsers(0);
            }
            else {
                setTotalPages(totalPages!);
                setCountUsers(totalCount!);
            }
            setUsers(users);
        }
    }, [page, router])

    useEffect(() => {
        getInitialUsers(dataForm);
    }, [page, dataForm, getInitialUsers]);

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await getInitialUsers(data);
        setDataForm(data);
        router.push("/admin/users?page=1")
    }

    const onChangeStatus = async (userId: string, value: boolean) => {
        await changeUserStatus(userId, value);
        toast.success('Estado actualizado');
        await getInitialUsers(dataForm);
    }

    const onChangeRole = async (userId: string, value: number) => {
        await changeUserRole(userId, value);
        toast.success('Permisos actualizados');
        await getInitialUsers(dataForm);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="my-2 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
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
                    <div className="relative">
                        <select
                            {...register('rol')}
                            className="appearance-none h-full border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option value={0}>[filtrar rol]</option>
                            <option value={1}>Admin</option>
                            <option value={2}>User</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            {...register('status')}
                            className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                            <option value="all">[filtrar estado]</option>
                            <option value="true">Activos</option>
                            <option value="false">Inactivos</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
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
                    <input placeholder="Search"
                        {...register('searching')}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
                <div className="flex">
                    <button type="submit" className="bg-primary py-1 px-3 rounded text-white hover:bg-secondary ml-5 cursor-pointer">
                        Buscar
                    </button>
                </div>
            </form>
            <div className="text-gray-500 my-5">Se encontraron {countUsers} usuarios.</div>
            <table className="w-full my-0 align-middle text-dark border-neutral-200 ">
                <thead className="align-bottom">
                    <tr className='font-bold text-[0.95rem] text-gray-300'>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                            EMAIL
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                            NOMBRE COMPLETO
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                            ROL
                        </th>
                        <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                            ESTADO
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map(user => (
                            <tr key={user.id} className="border-b border-dashed last:border-b-0 transition duration-300 ease-in-out hover:bg-gray-100">

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                            {
                                                user.image
                                                    ? (
                                                        <Image className="w-10 h-10 rounded-full"
                                                            src={user.image}
                                                            width={100}
                                                            height={0}
                                                            objectFit='true'
                                                            alt="" />

                                                    )
                                                    : (
                                                        <FaUserCircle className="w-10 h-10 text-primary" />
                                                    )
                                            }
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                    {user.name}
                                </td>
                                <td className="relative">
                                    <Toaster richColors position='bottom-right' />
                                    <select
                                        value={user.roleId}
                                        onChange={e => onChangeRole(user.id, parseInt(e.target.value))}
                                        className="appearance-none h-full rounded border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                        <option value={1}>Admin</option>
                                        <option value={2}>User</option>
                                    </select>
                                    <div
                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <CheckBox
                                        htmlFor={user.id}
                                        isChecked={user.isActive}
                                        onChange={() => onChangeStatus(user.id, user.isActive)}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination totalPages={totalPages} />
        </div>
    )
}
