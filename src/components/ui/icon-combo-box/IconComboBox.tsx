import React, { Fragment } from 'react';
import { Listbox, Transition } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";
import { iconsToCategory } from '../top-menu/ui/CategoryIcon';

type IconComboBoxProps = {
    selectedIcon: number;
    onSelectedIcon: (selected: number) => void;
};

export const IconComboBox = ({ selectedIcon, onSelectedIcon }: IconComboBoxProps) => {

    const test = iconsToCategory.find(x => x.id == selectedIcon)?.id;
    console.log(selectedIcon, test);

    return (
        <div className="mr-2">
            <Listbox value={selectedIcon} onChange={onSelectedIcon}>
                <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer rounded bg-white py-2 pl-3 pr-10 text-left  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <span className="flex items-center gap-2">
                            {iconsToCategory.find(x => x.id === selectedIcon)?.icon}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiSelector className="h-5 w-5 text-gray-400" />
                        </span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            {iconsToCategory.map((option) => (
                                <Listbox.Option
                                    key={option.id}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-4 pr-4 ${active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                                        }`
                                    }
                                    value={option.id}
                                >
                                    {() => (
                                        <span className="flex items-center gap-2 w-6 text-2xl ">
                                            {option.icon}
                                        </span>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
