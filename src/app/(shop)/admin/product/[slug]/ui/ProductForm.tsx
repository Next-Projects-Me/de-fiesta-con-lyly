"use client";

import { Product } from "@/interfaces/product.interface";
import { useForm } from "react-hook-form";
import clsx from 'clsx';
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { ProductImage as IProductImage } from "@/interfaces/productImage.interface";
import { deleteProductImage } from "@/actions/product/delete-product-image";
import { Color, Size } from "@/interfaces/feature.interface";
import { Subcategory } from "@/interfaces/category.interface";


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
    tags: string[];
    subcategoryId: number;
    images?: FileList;
}

export const ProductForm = ({ product, subcategories, sizes, colors }: Props) => {

    // const router = useRouter();
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const {
        handleSubmit,
        register,
        formState: { isValid },
        getValues,
        setValue,
        watch
    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags ?? [],
            sizes: product.sizes ?? [],
            colors: product.colors ?? [],
            numbers: product.numbers ?? [],
            images: undefined,
        }
    });

    watch('sizes');
    watch('numbers');

    const onSizeChanged = (size: string) => {

        const sizes = new Set(getValues('sizes'));
        if (sizes.has(size)) {
            sizes.delete(size)
        } else {
            sizes.add(size);
        }

        setValue('sizes', Array.from(sizes));
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
            formData.append('id', product.id ?? '');
        }

        formData.append('title', productToSave.title);
        formData.append('slug', productToSave.slug);
        formData.append('description', productToSave.description);
        formData.append('price', productToSave.price.toString());
        formData.append('inStock', productToSave.inStock.toString());
        formData.append('sizes', productToSave.sizes.toString());
        formData.append('colors', productToSave.colors.toString());
        formData.append('numbers', productToSave.numbers.toString());
        formData.append('tags', productToSave.tags.toString());
        formData.append('subcategoryId', productToSave.subcategoryId.toString());
        // formData.append('gender', productToSave.gender);

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }
        // const { ok, product: updatedProduct } = await createUpdateProduct(formData);

        // if (!ok) {
        //     alert('Producto no se pudo actualizar');
        //     return;
        // }

        // router.replace(`/admin/product/${updatedProduct?.slug}`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', { required: true })} />
                </div>

                {/* <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select className="p-2 border rounded-md bg-gray-200" {...register('gender', { required: true })} >
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div> */}

                <div className="flex flex-col mb-2">
                    <span>Subcategoría</span>
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

                <button
                    disabled={!isValid}
                    className="btn-primary mt-3 cursor-pointer">
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Inventario</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('inStock', { required: true, min: 0 })} />
                </div>

                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span>Números</span>
                    <div className="flex flex-wrap">

                        {
                            numbers.map(number => (
                                // bg-blue-500 text-white <--- si está seleccionado
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

                    <span>Tallas</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    key={size.id}
                                    onClick={() => onSizeChanged(size.size)}
                                    className={
                                        clsx(
                                            "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer",
                                            {
                                                'bg-blue-500 text-white': getValues('sizes').includes(size.size),
                                                'bg-white': !getValues('sizes').includes(size.size),
                                            }
                                        )
                                    }>

                                    <span>{size.size}</span>
                                </div>
                            ))
                        }
                    </div>

                    <span>Colores</span>
                    <div className="flex flex-wrap">
                        {
                            colors.map(color => (
                                <div key={color.id}
                                    // onClick={() => onColorChanged(color)}
                                    className={
                                        clsx(
                                            "flex justify-center items-center rounded-full",
                                            {
                                                // "border-3": color === selectedColor
                                            }
                                        )
                                    } >
                                    <button
                                        style={{ background: color.color }}
                                        className="w-7 h-7 m-1 text-lg cursor-pointer rounded-full"
                                    >
                                    </button>

                                </div>
                            ))
                        }
                    </div>

                    <span>Imágenes</span>
                    <div className="flex flex-col mb-2">

                        <input
                            type="file"
                            {...register('images')}
                            multiple
                            className="p-2 border rounded-md bg-gray-200 cursor-pointer"
                            accept="image/png, image/jpeg, image/avif"
                        />

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
                                        className="rounded-t shadow-md w-44 h-44"
                                    />
                                    <button
                                        type="button"
                                        className="btn-danger rounded-b-xl w-44 cursor-pointer"
                                        onClick={() => deleteProductImage(image.id, image.url)}
                                    >
                                        Eliminar
                                    </button>

                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </form>
    );
};