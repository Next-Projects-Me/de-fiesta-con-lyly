"use client";

import { CheckBox } from "@/components/ui/checkbox/CheckBox";
import { Color, Size } from "@/interfaces/feature.interface";
import { Controller, useForm } from "react-hook-form";
import { createUpdateProduct } from "@/actions/product/create-update-product";
import { deleteProductImageBunny } from "@/actions/product/delete-product-image";
import { Product } from "@/interfaces/product.interface";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { ProductImage as IProductImage } from "@/interfaces/productImage.interface";
import { Subcategory } from "@/interfaces/category.interface";
import { toast, Toaster } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from 'clsx';
import { IoCheckbox } from "react-icons/io5";

interface Props {
    product: Partial<Product> & { ProductImage?: IProductImage[] };
    subcategories: Subcategory[];
    sizes: Size[];
    colors: Color[];
}

interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    sizes: string[];
    colors: string[];
    numbers: string[];
    letters: boolean;
    subcategoryId: number;
    images?: FileList;
}

export const AdminProductForm = ({ product, subcategories, sizes, colors }: Props) => {

    const router = useRouter();
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        control,
        watch
    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            sizes: product.sizes ?? [],
            colors: product.colors ?? [],
            numbers: product.numbers ?? [],
            letters: product.letters,
            images: undefined,
        }
    });

    watch('sizes');
    watch('colors');
    watch('numbers');

    const title = watch('title');
    const files = watch('images');


    useEffect(() => {
        if (title) {
            const slug = title
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '_')
                .replace(/[^\w_]/g, '');

            setValue('slug', slug);
        }
    }, [title, setValue])


    const onSizeChanged = (size: string) => {

        const sizes = new Set(getValues('sizes'));
        if (sizes.has(size)) {
            sizes.delete(size)
        } else {
            sizes.add(size);
        }

        setValue('sizes', Array.from(sizes));
    }

    const onColorChanged = (color: string) => {

        const colors = new Set(getValues('colors'));
        if (colors.has(color)) {
            colors.delete(color)
        } else {
            colors.add(color);
        }

        setValue('colors', Array.from(colors));
    }

    const onNumberChanged = (number: string) => {

        const numbers = new Set(getValues('numbers'));
        if (numbers.has(number)) {
            numbers.delete(number)
        } else {
            numbers.add(number);
        }

        setValue('numbers', Array.from(numbers));
    }

    const onSubmit = async (data: FormInputs) => {

        const formData = new FormData();
        const { images, ...productToSave } = data;

        if (product.id) {
            formData.append('id', product.id.toString());
        }
        else {
            formData.append('id', "0");
        }

        formData.append('title', productToSave.title);
        formData.append('slug', productToSave.slug);
        formData.append('description', productToSave.description);
        formData.append('price', productToSave.price.toString());
        formData.append('inStock', productToSave.inStock.toString());
        formData.append('sizes', productToSave.sizes.toString());
        formData.append('colors', productToSave.colors.toString());
        formData.append('numbers', productToSave.numbers.toString());
        formData.append('letters', productToSave.letters.toString());
        formData.append('subcategoryId', productToSave.subcategoryId.toString());

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        const { ok, product: updatedProduct } = await createUpdateProduct(formData);
        if (!ok) {
            toast.error('No se pudo actualizar el producto');
            return;
        }

        setValue("images", undefined);
        toast.success('Producto actualizado correctamente');
        router.replace(`/admin/product/${updatedProduct?.slug}`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">

            <div className="-mt-10 hidden sm:flex sm:col-span-2 items-end justify-end">
                <button
                    type="submit"
                    className="btn-primary sm:relative sm:-top-5 cursor-pointer">
                    Guardar
                </button>
            </div>

            <div className="w-full">
                <Toaster richColors position="bottom-right" />
                <div className="flex flex-col mb-2">
                    <label className="font-bold">Título</label>
                    <input
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('title', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <label className="font-bold">Slug</label>
                    <input type="text"
                        disabled
                        className="p-2 border rounded-md bg-gray-400"
                        {...register('slug', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <label className="font-bold">Descripción</label>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <label className="font-bold">Price</label>
                    <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
                </div>

                <div className="flex flex-col mb-2">
                    <label className="font-bold">Subcategoría</label>
                    <select className="p-2 border rounded-md bg-gray-200" {...register('subcategoryId', { required: true })} >
                        <option value="">[Seleccione]</option>
                        {
                            subcategories.map(subcategory =>
                                <option key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                </option>
                            )
                        }
                    </select>
                </div>
                <div className="flex flex-col mb-2">
                    <label className="font-bold">Inventario</label>
                    <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('inStock', { required: true, min: 0 })} />
                </div>

                <label className="font-bold">Números</label>
                <div className="flex flex-wrap">

                    {
                        numbers.map(number => (
                            <div
                                key={number}
                                onClick={() => onNumberChanged(number.toString())}
                                className={
                                    clsx(
                                        "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer",
                                        {
                                            'bg-blue-500 text-white': getValues('numbers').includes(number.toString()),
                                            'bg-white': !getValues('numbers').includes(number.toString())
                                        }
                                    )
                                }>

                                <span>{number}</span>
                            </div>
                        ))
                    }
                </div>

                <label className="font-bold">Tallas</label>
                <div className="flex flex-wrap">
                    {
                        sizes.map(size => (
                            // bg-blue-500 text-white <--- si está seleccionado
                            <div
                                key={size.id}
                                onClick={() => onSizeChanged(size.name)}
                                className={
                                    clsx(
                                        "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer",
                                        {
                                            'bg-blue-500 text-white': getValues('sizes').includes(size.name),
                                            'bg-white': !getValues('sizes').includes(size.name),
                                        }
                                    )
                                }>

                                <span>{size.name}</span>
                            </div>
                        ))
                    }
                </div>

                <label className="font-bold">Colores</label>
                <div className="flex flex-wrap">
                    {
                        colors.map(color => (
                            <div key={color.id}
                                onClick={() => onColorChanged(color.name)}
                                className={
                                    clsx(
                                        "flex justify-center items-center rounded-full mr-2",
                                        {
                                            "border-3": getValues('colors').includes(color.name)
                                        }
                                    )
                                } >
                                <button
                                    type='button'
                                    style={{ background: color.name }}
                                    className="w-7 h-7 m-1 text-lg cursor-pointer rounded-full"
                                >
                                </button>

                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-row items-center my-3">
                    <label className="font-bold">Letras</label>
                    <Controller
                        name="letters"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <CheckBox htmlFor={product.id?.toString()}
                                isChecked={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">

                {/* As checkboxes */}
                <div className="flex flex-col">

                    <label className="font-bold">Imágenes</label>
                    <div className="flex flex-col mb-2">
                        <input
                            type="file"
                            {...register('images')}
                            multiple
                            className="p-2 border rounded-md bg-gray-200 cursor-pointer"
                            accept="image/png, image/jpeg, image/avif"
                        />
                        {
                            files && (
                                <div className="mt-2">
                                    <p >Imágenes a cargar:</p>
                                    {
                                        Array.from(files).map((file, index) => (
                                            <div className="flex items-center" key={index}>
                                                <li className="mr-2">{file.name}</li>
                                                <IoCheckbox className="text-lime-700" />
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className="flex flex-wrap">
                        {
                            product.ProductImage?.map(image => (
                                <div key={image.id} className="mr-3 mt-3">
                                    <ProductImage
                                        alt={product.title!}
                                        src={image.url}
                                        width={300}
                                        height={300}
                                        className="rounded-t shadow-md w-30 h-30 sm:w-44 sm:h-44"
                                    />
                                    <button
                                        type="button"
                                        className="btn-danger rounded-b-xl w-30 sm:w-44 cursor-pointer"
                                        onClick={() => deleteProductImageBunny(image.id, image.url)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="btn-primary mt-10 sm:hidden cursor-pointer">
                Guardar
            </button>
        </form>
    );
};