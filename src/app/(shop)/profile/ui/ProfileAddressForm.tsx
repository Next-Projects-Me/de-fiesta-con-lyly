'use client';

import { Address } from '@/interfaces/address.interface';
import { City } from '@/interfaces/cities.interface';
import { Controller, useForm } from 'react-hook-form';
import { Department } from '@/interfaces/departments.interface';
import { setUserAddress } from '@/actions/address/set-user-address';
import { Title } from '@/components/ui/title/Title';
import { toast } from 'sonner';
import React from 'react';

interface Props {
    address?: Address,
    departments: Department[],
    cities: City[],
}

type FormInputs = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    departmentId: number;
    cityId: number;
    phone: string;
    document: string;
    rememberAddress: boolean;
}

export const ProfileAddressForm = ({ address, departments, cities }: Props) => {

    const { control, watch, handleSubmit, register, formState: { isValid } } = useForm<FormInputs>({
        defaultValues: address,
    });

    const selectedDepartment = watch('departmentId', 0);

    const onSubmit = async (data: FormInputs) => {
        const resp = await setUserAddress(data);
        if (resp.ok) {
            toast.success('Dirección actualizada correctamente');
        }
        else {
            toast.error(resp.message);
        }
    }

    return (
        <div className='border-interface p-5 mx-5 sm:mx-0 mt-5 sm:mt-10 mb-10'>
            <Title title="Mi dirección" />
            <form onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
                <div className="flex flex-col mb-2">
                    <span>Nombres</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200" {...register('firstName', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Apellidos</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200" {...register('lastName', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Dirección</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200" {...register('address', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Dirección 2 (opcional)</span>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200" {...register('address2')}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Departamento</span>
                    <Controller
                        name="departmentId"
                        control={control}
                        render={({ field }) => (
                            <select {...field}
                                className="p-2 border rounded-md bg-gray-200" {...register('departmentId', { required: true })}
                            >
                                <option value="">[ Seleccione ]</option>
                                {
                                    departments.map(department => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                    ))
                                }
                            </select>
                        )}
                    />
                </div>
                <div className="flex flex-col mb-2">
                    <span>Ciudad</span>
                    <Controller
                        name="cityId"
                        control={control}
                        render={({ field }) => (
                            <select {...field}
                                className="p-2 border rounded-md bg-gray-200" {...register('cityId', { required: true })}
                            >
                                <option value="">[ Seleccione ]</option>
                                {
                                    selectedDepartment
                                        ?
                                        cities.filter(city => city.departmentId == selectedDepartment).map(city => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))
                                        :
                                        cities.filter(city => city.departmentId == address?.departmentId).map(city => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))
                                }
                            </select>
                        )}
                    />
                </div>
                <div className='flex flex-col'>
                    <div className="flex flex-col mb-2">
                        <span>Teléfono</span>
                        <input
                            type="number"
                            className="p-2 border rounded-md bg-gray-200" {...register('phone', { required: true })}
                        />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className="flex flex-col mb-2">
                        <span>Documento</span>
                        <input
                            type="number"
                            className="p-2 border rounded-md bg-gray-200" {...register('document', { required: true })}
                        />
                    </div>
                </div>
                <div className="col-start-1 flex flex-col mb-2 mt-5">
                    <button
                        disabled={!isValid}
                        type="submit"
                        className='btn-primary w-[50%]'
                    >
                        Guardar
                    </button>
                </div>

            </form>
        </div>
    )
}
