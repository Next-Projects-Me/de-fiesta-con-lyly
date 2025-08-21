'use client';

import { Cost } from '@/interfaces/cost.interface';
import { Title } from '@/components/ui/title/Title'
import { toast } from 'sonner'
import { updateCosts } from '@/actions/costs/update-costs';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import React, { useEffect } from 'react'

type FormInputs = {
    VAT: number;
    sending: number;
}

interface Props {
    costs: Cost[]
}

export const AdditionalCostsForm = ({ costs }: Props) => {

    const { handleSubmit, register, formState: { isValid }, reset } = useForm<FormInputs>({
        defaultValues: {
            VAT: costs.findLast(x => x.name === "IVA")?.price,
            sending: costs.findLast(x => x.name === 'Envío')?.price,
        }
    });

    useEffect(() => {
        reset({
            VAT: costs.findLast(x => x.name === "IVA")?.price,
            sending: costs.findLast(x => x.name === 'Envío')?.price,
        });
    }, [reset, costs]);

    const onSaveCosts = async (data: FormInputs) => {
        const VAT = costs.findLast(x => x.name === "IVA")?.id;
        let resp = await updateCosts(VAT!, data.VAT);

        const sending = costs.findLast(x => x.name === 'Envío')?.id;
        resp = await updateCosts(sending!, data.sending);
        if (!resp.ok) {
            toast.error(resp.message);
        } else {
            toast.success(resp.message);
        }
    }

    return (
        <div className='border-interface p-5 mx-5 sm:mx-0 mt-10 mb-10'>
            <Title title="Costos adicionales" />
            <form onSubmit={(handleSubmit(onSaveCosts))} className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2'>

                <div className='flex flex-col'>
                    <span>IVA</span>
                    <input type='number'
                        className='p-2 border rounded-md bg-gray-200  mb-5' {...register('VAT', { required: true })} />
                </div>
                <div className='flex flex-col'>
                    <span>Envío</span>
                    <input type='number'
                        className='p-2 border rounded-md bg-gray-200 mb-5' {...register('sending', { required: true })} />
                </div>
                <div>
                    <button
                        disabled={!isValid}
                        type="submit"
                        className={
                            clsx(
                                'col-start-2 btn-primary w-[50%] cursor-pointer',
                                {
                                    'btn-primary': isValid,
                                    'btn-disabled': !isValid,
                                }
                            )
                        }
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}
