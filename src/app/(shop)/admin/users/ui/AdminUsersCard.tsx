'use client';

// import { changeUserRole } from '@/actions/users/change-user-rol';
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
import { LoadingSpinner } from '@/components/ui/loading-spinner/Loading';

interface Props {
    page: number;
}

type Inputs = {
    take: number;
    rol: number;
    status: string;
    searching: string;
}

export const AdminUsersCard = ({ page }: Props) => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
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
        setLoaded(true);
    }, [page, dataForm, getInitialUsers]);

    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoaded(false);
        await getInitialUsers(data);
        setDataForm(data);
        router.push("/admin/users?page=1")
    }

    const onChangeStatus = async (userId: string, value: boolean) => {
        await changeUserStatus(userId, value);
        toast.success('Estado actualizado');
        await getInitialUsers(dataForm);
    }

    // const onChangeRole = async () => {
    //     // await changeUserRole(userId, value);
    //     // toast.success('Permisos actualizados');
    //     // await getInitialUsers(dataForm);
    // }

    return (
        <div>
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
                            {...register('status')}
                            className="h-full outline-0 w-full sm:w-fit">
                            <option value="all">[filtrar estado]</option>
                            <option value="true">Activos</option>
                            <option value="false">Inactivos</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-2 w-full sm:w-fit">
                    <div className="p-2 border rounded-md bg-gray-200 w-full sm:w-fit">
                        <select
                            {...register('rol')}
                            className="h-full outline-0 w-full sm:w-fit">
                            <option value={0}>[filtrar rol]</option>
                            <option value={1}>Admin</option>
                            <option value={2}>User</option>
                        </select>
                    </div>
                    <div className="flex items-center w-full h-10 p-2 border rounded-md bg-gray-200">
                        <span className="h-full flex items-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                <path
                                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                </path>
                            </svg>
                        </span>
                        <input placeholder="Search"
                            {...register('searching')}
                            className="w-full outline-0" />
                    </div>
                    <div className="flex">
                        <button type="submit" className="bg-primary py-1 px-3 rounded text-white hover:bg-secondary cursor-pointer">
                            Buscar
                        </button>
                    </div>
                </div>
            </form>
            {
                !loaded && <LoadingSpinner className="mt-10" />
            }
            {
                loaded &&
                <div className="px-5 sm:px-0 mt-5 text-sm sm:text-base">
                    {
                        users?.length === 0
                            ? <div className="border-interface text-gray-500 p-5">Se encontraron {countUsers} usuarios.</div>
                            : <div className="border-interface grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
                                {
                                    users?.map(user => (
                                        <div key={user.id} className="p-5">
                                            <div className="flex flex-col gap-3 justify-between items-start rounded-b-xl border-b-2 border-l-2 px-3 border-gray-200 w-full h-full">
                                                <div className="flex justify-center w-full h-full">
                                                    {
                                                        user.image
                                                            ? <Image className="w-26 rounded-full"
                                                                src={user.image}
                                                                width={200}
                                                                height={200}
                                                                alt="" />
                                                            : <FaUserCircle className="w-26 h-26 text-primary" />
                                                    }
                                                </div>
                                                <div className='flex flex-col w-full h-full'>
                                                    <div className='mb-2'>
                                                        <label className="font-bold">Email:</label>
                                                        <p>{user.email}</p>
                                                    </div>
                                                    <div className='mb-2'>
                                                        <label className="font-bold">Nombre:</label>
                                                        <p>{user.name}</p>

                                                    </div>
                                                    <div className='flex flex-row justify-between gap-5 mb-2'>
                                                        <div className='flex flex-col items-center mb-5'>
                                                            <label className="font-bold">Estado:</label>
                                                            <CheckBox
                                                                htmlFor={user.id}
                                                                isChecked={user.isActive}
                                                                onChange={() => onChangeStatus(user.id, user.isActive)}
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold mr-2 mb-1">Rol:</p>
                                                            <div className="p-2 border rounded-md w-fit">
                                                                <Toaster richColors position='bottom-right' />
                                                                <select
                                                                    disabled={true}
                                                                    value={user.roleId}
                                                                    // onChange={e => onChangeRole(user.id, parseInt(e.target.value))}
                                                                    className="h-full outline-0 w-fit">
                                                                    <option value={1}>Admin</option>
                                                                    <option value={2}>User</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

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
                <Pagination totalPages={totalPages} />
            }
        </div>
    )
}
