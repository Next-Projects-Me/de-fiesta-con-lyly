'use client';

import { BiSolidEdit } from 'react-icons/bi';
import { Category, Subcategory } from '@/interfaces/category.interface';
import { CategoryIcon, iconsToCategory } from '@/components/ui/top-menu/ui/CategoryIcon';
import { createCategory } from '@/actions/categories/create-category';
import { createSubcategory } from '@/actions/categories/create-subcategory';
import { FaPlus } from 'react-icons/fa';
import { IoCheckboxOutline } from 'react-icons/io5';
import { Title } from '@/components/ui/title/Title';
import { toast } from 'sonner';
import { updateCategory } from '@/actions/categories/update-category';
import { updateSubcategory } from '@/actions/categories/update-subcategory';
import clsx from 'clsx';
import React, { useState } from 'react';
import { IconComboBox } from '@/components/ui/icon-combo-box/IconComboBox';

interface Props {
    categories: Category[];
}

export const CategoriesForm = ({ categories }: Props) => {

    const [categoryId, setCategoryId] = useState(0);
    const [currentCategory, setCurrentCategory] = useState('');
    const [currentCategoryIcon, setCurrentCategoryIcon] = useState(0);
    const [categoryIcon, setCategoryIcon] = useState(1);
    const [categoryName, setCategoryName] = useState('');

    const [subcategoryId, setSubcategoryId] = useState(0);
    const [currentSubcategory, setCurrentSubcategory] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');

    const onEditCategory = (cat: Category) => {
        setCategoryId(cat.id);
        setCurrentCategory(cat.name);
        setCurrentCategoryIcon(cat.icon);
    }

    const onEditingCategory = async () => {
        console.log(currentCategoryIcon);
        const resp = await updateCategory(categoryId, currentCategory, currentCategoryIcon);
        messageBox(resp.ok, resp.message);
        setCategoryId(0);
    }

    const onEditSubcategory = (sub: Subcategory) => {
        setSubcategoryId(sub.id);
        setCurrentSubcategory(sub.name);
    }

    const onEditingSubCategory = async (isActive: boolean) => {
        const resp = await updateSubcategory(subcategoryId, currentSubcategory, isActive);
        messageBox(resp.ok, resp.message);
        setSubcategoryId(0);
    }

    const onCreateCategory = async () => {
        if (!categoryName) {
            toast.warning('El nombre de la categoría no puede ir vacía.');
            return;
        }

        const resp = await createCategory(categoryName, categoryIcon);
        messageBox(resp.ok, resp.message);
        setCategoryName('');
    }

    const onCreateSubcategory = async (categoryId: number) => {
        if (!subcategoryName) {
            toast.warning('El nombre de la sub-categoría no puede ir vacía.');
            return;
        }

        const resp = await createSubcategory(categoryId, subcategoryName);
        messageBox(resp.ok, resp.message);
        setSubcategoryName('');
    }

    const messageBox = (ok: boolean, message: string) => {
        if (!ok) {
            toast.error(message);
        } else {
            toast.success(message);
        }
    }

    return (
        <div className='border-interface p-5 mx-5 sm:mx-0 mt-8 sm:mt-5'>
            <Title title="Menu de Categorías" />
            {
                categories.map(cat => (
                    <div key={cat.id} className='flex items-start w-full' >
                        <div className='mr-2 flex flex-col justify-center'>
                            <BiSolidEdit
                                onClick={() => onEditCategory(cat)}
                                className='text-2xl cursor-pointer hover:text-purple-700' />
                            {
                                cat.id === categoryId &&
                                <IoCheckboxOutline onClick={() => onEditingCategory()}
                                    className='text-2xl text-green-700 cursor-pointer' />
                            }
                        </div>
                        <details
                            tabIndex={0}
                            className={
                                clsx(
                                    'bg-gray-300 w-full rounded flex flex-col cursor-pointer mb-5',
                                    {
                                        'hover:bg-rose-400 hover:text-white': cat.id !== categoryId
                                    }
                                )
                            }>

                            <summary className='flex items-center ml-2 p-3'>
                                {
                                    cat.id === categoryId
                                        ? (
                                            <>
                                                <IconComboBox selectedIcon={currentCategoryIcon} onSelectedIcon={setCurrentCategoryIcon} />
                                                {/* <CategoryIcon className='mr-3 text-2xl' icon={cat.icon} /> */}
                                                <input
                                                    onChange={(e) => { setCurrentCategory(e.target.value) }}
                                                    value={currentCategory}
                                                    className='w-34 sm:w-full border-b-2 border-b-rose-500 focus:outline-0'
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <CategoryIcon className='mr-3 text-2xl' icon={cat.icon} />
                                                <p>{cat.name}</p>
                                            </>
                                        )
                                }
                            </summary>
                            {
                                categoryId === 0 &&
                                <div className='bg-white border-b-2 p-5 text-black'>
                                    {
                                        cat.Subcategory.map(sub => (
                                            <div key={sub.id} className='mb-2 flex w-full items-center'>
                                                {
                                                    sub.id === subcategoryId
                                                        ? (
                                                            <input
                                                                onChange={(e) => setCurrentSubcategory(e.target.value)}
                                                                value={currentSubcategory}
                                                                className='border-b-2 border-b-rose-500 focus:outline-0'
                                                            />
                                                        ) : (
                                                            <p
                                                                onClick={() => updateSubcategory(sub.id, sub.name, !sub.isActive)}
                                                                className={
                                                                    clsx({
                                                                        'line-through decoration-2 decoration-purple-700': !sub.isActive,
                                                                        'no-underline': sub.isActive
                                                                    })
                                                                }>
                                                                {sub.name}
                                                            </p>
                                                        )
                                                }
                                                <div className='flex'>
                                                    <BiSolidEdit onClick={() => onEditSubcategory(sub)}
                                                        className='ml-3 text-xl hover:text-purple-700' />
                                                    {
                                                        sub.id === subcategoryId &&
                                                        <IoCheckboxOutline onClick={() => onEditingSubCategory(sub.isActive!)}
                                                            className='text-xl text-green-700' />
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className='flex flex-col sm:flex-row'>
                                        <input onChange={(e) => setSubcategoryName(e.target.value)}
                                            value={subcategoryName}
                                            className='border-b-rose-500 border-b-2 h-10 w-full sm:w-fit mr-5 focus:border-b-rose-700 focus:outline-0' placeholder='Sub-categoría' />
                                        <button
                                            onClick={() => onCreateSubcategory(cat.id)}
                                            className='btn-primary mt-5 sm:mt-0 flex items-center'>
                                            <FaPlus className='mr-3' />
                                            Agregar
                                        </button>
                                    </div>
                                </div>

                            }
                        </details>

                    </div>
                ))
            }
            <details className='bg-gray-300 rounded flex flex-col cursor-pointer mb-5 hover:bg-rose-400 hover:text-white'>
                <summary className='flex items-center ml-2 p-3 hover:text-white'>
                    <FaPlus className='mr-3 text-2xl' />
                    Agregar Categoría
                </summary>
                <div className='bg-white border-b-2 p-5 text-black'>
                    <div className='mb-5'>
                        <div className='flex flex-wrap'>
                            {
                                iconsToCategory.map(icon => (
                                    <div
                                        key={icon.id}
                                        onClick={() => setCategoryIcon(icon.id)}
                                        className={
                                            clsx(
                                                "px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-2xl cursor-pointer rounded",
                                                {
                                                    "text-white bg-purple-700 hover:bg-purple-700": categoryIcon === icon.id,
                                                }
                                            )
                                        }
                                    >
                                        {icon.icon}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row'>
                        <input
                            onChange={(e) => setCategoryName(e.target.value)}
                            value={categoryName}
                            className='border-b-rose-500 border-b-2 h-10 w-full sm:w-fit mr-5 focus:border-b-rose-700 focus:outline-0' placeholder='Nombre' />
                        <button
                            onClick={() => onCreateCategory()}
                            className='btn-primary  mt-5 sm:mt-0'>
                            Guardar
                        </button>
                    </div>
                </div>
            </details>
        </div>
    )
}
