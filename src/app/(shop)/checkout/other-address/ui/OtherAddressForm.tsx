'use client';

import { City } from "@/interfaces/cities.interface";
import { Controller, useForm } from "react-hook-form";
import { Department } from "@/interfaces/departments.interface";
import { useAddressStore } from "@/store/address/address-store";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type FormInputs = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    departmentId: number;
    cityId: number;
    phone: string;
    document: string;
}

interface Props {
    departments: Department[];
    cities: City[];
}

export const OtherAddressForm = ({ departments, cities }: Props) => {

    const router = useRouter();

    const setAddress = useAddressStore(state => state.setAddress);
    const address = useAddressStore(state => state.address);

    const { control, watch, handleSubmit, register, formState: { isValid } } = useForm<FormInputs>({});

    const selectedDepartment = watch('departmentId', 0);

    const onSubmit = async (data: FormInputs) => {

        const department = departments.findLast(dep => dep.id == data.departmentId);
        const city = cities.findLast(city => city.id == data.cityId);

        setAddress({ ...data, department: department!.name, city: city!.name });

        router.push('/checkout')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 ">
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
                                    cities.filter(city => city.departmentId == address.departmentId).map(city => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))
                            }
                        </select>
                    )}
                />
            </div>

            <div className="flex flex-col mb-2">
                <span>Teléfono</span>
                <input
                    type="number"
                    className="p-2 border rounded-md bg-gray-200" {...register('phone', { required: true })}
                />
            </div>
            <div className="flex flex-col mb-2">
                <span>Documento (Solo para facturación)</span>
                <input
                    type="number"
                    className="p-2 border rounded-md bg-gray-200" {...register('document', { required: true })}
                />
            </div>
            <div className="flex flex-col col-start-1 mt-3 sm:mt-0">
                <div className="flex mb-2">
                    <button
                        disabled={!isValid}
                        type="submit"
                        className={
                            clsx(
                                'cursor-pointer',
                                {
                                    'btn-primary': isValid,
                                    'btn-disabled': !isValid,
                                }
                            )
                        }
                    >
                        Siguiente
                    </button>
                </div>
            </div>

        </form>
    )
}
