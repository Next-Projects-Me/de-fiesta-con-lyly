'use client';

import { Title } from '@/components/ui/title/Title';
import { toast } from 'sonner';
import { updateUserName } from '@/actions/users/update-user-name';
import { useForm } from 'react-hook-form';
import React from 'react';

interface Props {
    fullname: string;
    email: string;
}

type FormInputs = {
    fullname: string;
    email: string;
}

export const ProfileInformation = ({ fullname, email }: Props) => {

    const { handleSubmit, register } = useForm<FormInputs>({
        defaultValues: { fullname, email },
    });

    const onSubmit = async (data: FormInputs) => {
        const resp = await updateUserName(data.fullname);
        if (resp.ok) {
            toast.success('Nombre actualizado correctamente');
        }
        else {
            toast.error(resp.message);
        }
    }

    return (
        <div className='border-interface p-5 mx-5 sm:mx-0 mt-8 sm:mt-5 '>
            <Title title="Perfil" />
            <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2'>
                <div className='flex flex-col'>
                    <span>Nombre Completo</span>
                    <input className='p-2 border rounded-md bg-gray-200  mb-5' {...register('fullname')} />
                </div>
                <div className='flex flex-col'>
                    <span>Correo electrónico</span>
                    <input disabled className='p-2 border rounded-md bg-gray-400  mb-5' {...register('email')} />
                </div>
                <div>
                    <button
                        type="submit"
                        className='col-start-2 btn-primary w-[50%]'
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}
