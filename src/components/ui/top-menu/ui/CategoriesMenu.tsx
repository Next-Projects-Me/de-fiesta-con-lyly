'use client';

import { FaChild, FaTheaterMasks } from "react-icons/fa";
import { GiBowTieRibbon, GiGlassCelebration, GiPartyPopper } from "react-icons/gi";
import { IoBalloon } from "react-icons/io5";
import { TbRating18Plus } from "react-icons/tb";
import { useEffect, useRef } from "react";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";


// grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
export const CategoriesMenu = () => {

    const isNavMenuOpen = useUiStore(state => state.isNavMenuOpen);
    const closeNavMenu = useUiStore(store => store.closeNavMenu);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                closeNavMenu();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div ref={divRef}
            className={
                clsx(
                    "overflow-y-scroll absolute z-10 text-xl grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-5 py-3 items-start w-full bg-white text-primary shadow-md fade-in",
                    {
                        "hidden": !isNavMenuOpen,
                    }
                )
            }>

            <div className="mb-4">
                <span className="flex items-center font-bold">
                    <GiBowTieRibbon className="mr-3 my-2" />ACCESORIOS
                </span>
                <ul className="text-gray-600">
                    <li className="hover:text-primary cursor-pointer">Medidores</li>
                    <li className="hover:text-primary cursor-pointer" >Cortadores</li>
                    <li className="hover:text-primary cursor-pointer" >Serpentinas</li>
                    <li className="hover:text-primary cursor-pointer" >Copas</li>
                    <li className="hover:text-primary cursor-pointer" >Vasos</li>
                    <li className="hover:text-primary cursor-pointer" >Platos</li>
                    <li className="hover:text-primary cursor-pointer" >Cubiertos</li>
                    <li className="hover:text-primary cursor-pointer" >Servilletas</li>
                    <li className="hover:text-primary cursor-pointer" >Bases para pastel</li>
                    <li className="hover:text-primary cursor-pointer" >Velas</li>
                </ul>
                <span className="flex items-center font-bold">
                    <FaChild className="mr-3 my-2" />INFANTIL
                </span>
                <ul className="text-gray-600">
                    <li className="hover:text-primary cursor-pointer">Niñas</li>
                    <li className="hover:text-primary cursor-pointer">Niños</li>
                </ul>
                <span className="flex items-center font-bold">
                    <TbRating18Plus className="mr-3 my-2" />ADULTOS
                </span>
                <ul className="text-gray-600">
                    <li className="hover:text-primary cursor-pointer" >Fiesta Mexicana</li>
                    <li className="hover:text-primary cursor-pointer" >Rock</li>
                    <li className="hover:text-primary cursor-pointer" >Hora Loca</li>
                    <li className="hover:text-primary cursor-pointer" >Hawaiana</li>
                    <li className="hover:text-primary cursor-pointer" >Colombiana</li>
                    <li className="hover:text-primary cursor-pointer" >Aguacates</li>
                    <li className="hover:text-primary cursor-pointer" >Casino</li>
                    <li className="hover:text-primary cursor-pointer" >Emoji</li>
                    <li className="hover:text-primary cursor-pointer" >Hollywood</li>
                    <li className="hover:text-primary cursor-pointer" >Pride</li>
                    <li className="hover:text-primary cursor-pointer" >50 años</li>
                    <li className="hover:text-primary cursor-pointer" >Star Wars</li>
                    <li className="hover:text-primary cursor-pointer" >Harry Potter</li>
                    <li className="hover:text-primary cursor-pointer" >Vaqueros</li>
                    <li className="hover:text-primary cursor-pointer" >Disco</li>
                    <li className="hover:text-primary cursor-pointer" >Margaritas</li>
                    <li className="hover:text-primary cursor-pointer" >Fiesta de Neon</li>
                </ul>
            </div>

            {/* <div className="mb-4">
                <span className="flex items-center font-bold">
                    <FaChild className="mr-3 my-2" />INFANTIL
                </span>
                <ul className="text-gray-600">
                    <li className="hover:text-primary cursor-pointer">Niñas</li>
                    <li className="hover:text-primary cursor-pointer">Niños</li>
                </ul>
            </div> */}


            {/* <div className="mb-4">
                <span className="flex items-center font-bold">
                    <TbRating18Plus className="mr-3 my-2" />ADULTOS
                </span>
                <ul className="text-gray-600">
                    <li className="hover:text-primary cursor-pointer" >Fiesta Mexicana</li>
                    <li className="hover:text-primary cursor-pointer" >Rock</li>
                    <li className="hover:text-primary cursor-pointer" >Hora Loca</li>
                    <li className="hover:text-primary cursor-pointer" >Hawaiana</li>
                    <li className="hover:text-primary cursor-pointer" >Colombiana</li>
                    <li className="hover:text-primary cursor-pointer" >Aguacates</li>
                    <li className="hover:text-primary cursor-pointer" >Casino</li>
                    <li className="hover:text-primary cursor-pointer" >Emoji</li>
                    <li className="hover:text-primary cursor-pointer" >Hollywood</li>
                    <li className="hover:text-primary cursor-pointer" >Pride</li>
                    <li className="hover:text-primary cursor-pointer" >50 años</li>
                    <li className="hover:text-primary cursor-pointer" >Star Wars</li>
                    <li className="hover:text-primary cursor-pointer" >Harry Potter</li>
                    <li className="hover:text-primary cursor-pointer" >Vaqueros</li>
                    <li className="hover:text-primary cursor-pointer" >Disco</li>
                    <li className="hover:text-primary cursor-pointer" >Margaritas</li>
                    <li className="hover:text-primary cursor-pointer" >Fiesta de Neon</li>
                </ul>
            </div> */}

            <div className="mb-4">
                <span className="flex items-center font-bold">
                    <GiPartyPopper className="mr-3 my-2" />CELEBRACIONES
                </span>
                <ul className="text-gray-600">
                    <li className="hover:text-primary cursor-pointer">Revelación de Genero</li>
                    <li className="hover:text-primary cursor-pointer">Baby Shower</li>
                    <li className="hover:text-primary cursor-pointer">Grados</li>
                    <li className="hover:text-primary cursor-pointer">Bautizo</li>
                    <li className="hover:text-primary cursor-pointer">Primera Comunión</li>
                    <li className="hover:text-primary cursor-pointer">Aniversario</li>
                    <li className="hover:text-primary cursor-pointer">Bienvenida</li>
                    <li className="hover:text-primary cursor-pointer">Navidad</li>
                    <li className="hover:text-primary cursor-pointer">Despedida</li>
                    <li className="hover:text-primary cursor-pointer">Halloween</li>
                    <li className="hover:text-primary cursor-pointer">San Valentín</li>
                </ul>
                <span className="flex items-center font-bold">
                    <IoBalloon className="mr-3 my-2" />GLOBOS
                </span>
                <ul className="text-gray-600">
                    <li className="hover:text-primary cursor-pointer">Personaje</li>
                    <li className="hover:text-primary cursor-pointer">Metalizados</li>
                    <li className="hover:text-primary cursor-pointer">Burbujas</li>
                    <li className="hover:text-primary cursor-pointer">Cantoyas</li>
                    <li className="hover:text-primary cursor-pointer">Base para globos</li>
                    <li className="hover:text-primary cursor-pointer">Infladores</li>
                </ul>
            </div>

            {/* <div className="mb-4">
                <span className="flex items-center font-bold">
                    <IoBalloon className="mr-3 my-2" />GLOBOS
                </span>
                <ul className="text-gray-600">
                    <li className="hover:text-primary cursor-pointer">Personaje</li>
                    <li className="hover:text-primary cursor-pointer">Metalizados</li>
                    <li className="hover:text-primary cursor-pointer">Burbujas</li>
                    <li className="hover:text-primary cursor-pointer">Cantoyas</li>
                    <li className="hover:text-primary cursor-pointer">Base para globos</li>
                    <li className="hover:text-primary cursor-pointer">Infladores</li>
                </ul>
            </div> */}

            <div className="mb-4">
                <span className="flex items-center font-bold">
                    <GiGlassCelebration className="mr-3 my-2" />DESPEDIDAS
                </span>
                <ul className="text-gray-600">
                    <li className="hover:text-primary cursor-pointer">Velos</li>
                    <li className="hover:text-primary cursor-pointer">Sets</li>
                    <li className="hover:text-primary cursor-pointer">Bandas</li>
                    <li className="hover:text-primary cursor-pointer">Tiaras</li>
                    <li className="hover:text-primary cursor-pointer">Copas</li>
                    <li className="hover:text-primary cursor-pointer">Platos y Vasos</li>
                </ul>
            </div>

            <div className="mb-4">
                <span className="flex items-center font-bold">
                    <FaTheaterMasks className="mr-3 my-2" />DISFRACES
                </span>
                <ul className="text-gray-600">
                    <li className="hover:text-primary cursor-pointer">Disfraces completos</li>
                    <li className="hover:text-primary cursor-pointer">Pelucas</li>
                    <li className="hover:text-primary cursor-pointer">Diademas</li>
                    <li className="hover:text-primary cursor-pointer">Bigotes</li>
                    <li className="hover:text-primary cursor-pointer">Mascaras</li>
                    <li className="hover:text-primary cursor-pointer">Corbatas</li>
                    <li className="hover:text-primary cursor-pointer">Gafas</li>
                    <li className="hover:text-primary cursor-pointer">Collares</li>
                    <li className="hover:text-primary cursor-pointer">Gorros y sombreros</li>
                    <li className="hover:text-primary cursor-pointer">Pompones</li>
                    <li className="hover:text-primary cursor-pointer">Medias</li>
                    <li className="hover:text-primary cursor-pointer">Pañoletas</li>
                </ul>
            </div>
        </div >
    )
}
