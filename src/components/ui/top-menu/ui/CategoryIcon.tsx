import { BiSolidHappyBeaming } from "react-icons/bi";

import {
    BsEmojiSunglasses,
    BsEnvelopePaperHeart
} from "react-icons/bs";

import {
    FaBabyCarriage,
    FaChild,
    FaGlasses,
    FaTheaterMasks
} from "react-icons/fa";

import {
    GiBatMask,
    GiBowTieRibbon,
    GiGlassCelebration,
    GiPartyHat,
    GiPartyPopper,
    GiPumpkinMask,
    GiRolledCloth
} from "react-icons/gi";

import { IoBalloon } from "react-icons/io5";
import { JSX } from "react";
import { MdOutlineSmartToy } from "react-icons/md";

import {
    TbChristmasBall,
    TbChristmasTree,
    TbHorseToy,
    TbRating18Plus
} from "react-icons/tb";


interface Props {
    icon?: number;
    className?: string;
}

export type IconOption = {
    id: number;
    icon: JSX.Element;
};

export const iconsToCategory: IconOption[] = [
    { id: 1, icon: <GiBowTieRibbon /> },
    { id: 2, icon: <FaChild /> },
    { id: 3, icon: <TbRating18Plus /> },
    { id: 4, icon: <GiPartyPopper /> },
    { id: 5, icon: <IoBalloon /> },
    { id: 6, icon: <GiGlassCelebration /> },
    { id: 7, icon: <FaTheaterMasks /> },
    { id: 8, icon: <GiPartyHat /> },
    { id: 9, icon: <GiBatMask /> },
    { id: 10, icon: <BiSolidHappyBeaming /> },
    { id: 11, icon: <GiRolledCloth /> },
    { id: 12, icon: <BsEnvelopePaperHeart /> },
    { id: 13, icon: <FaGlasses /> },
    { id: 14, icon: <BsEmojiSunglasses /> },
    { id: 15, icon: <MdOutlineSmartToy /> },
    { id: 16, icon: <TbHorseToy /> },
    { id: 17, icon: <FaBabyCarriage /> },
    { id: 18, icon: <TbChristmasBall /> },
    { id: 19, icon: <TbChristmasTree /> },
    { id: 20, icon: <GiPumpkinMask /> },
]

export const CategoryIcon = ({ icon, className }: Props) => {

    switch (icon) {
        case 1:
            return (<GiBowTieRibbon className={className} />)
        case 2:
            return (<FaChild className={className} />)
        case 3:
            return (<TbRating18Plus className={className} />)
        case 4:
            return (<GiPartyPopper className={className} />)
        case 5:
            return (<IoBalloon className={className} />)
        case 6:
            return (<GiGlassCelebration className={className} />)
        case 7:
            return (<FaTheaterMasks className={className} />)
        case 8:
            return (<GiPartyHat className={className} />)
        case 9:
            return (<GiBatMask className={className} />)
        case 10:
            return (<BiSolidHappyBeaming className={className} />)
        case 11:
            return (<GiRolledCloth className={className} />)
        case 12:
            return (<BsEnvelopePaperHeart className={className} />)
        case 13:
            return (<FaGlasses className={className} />)
        case 14:
            return (<BsEmojiSunglasses className={className} />)
        case 15:
            return (<MdOutlineSmartToy className={className} />)
        case 16:
            return (<TbHorseToy className={className} />)
        case 17:
            return (<FaBabyCarriage className={className} />)
        case 18:
            return (<TbChristmasBall className={className} />)
        case 19:
            return (<TbChristmasTree className={className} />)
        case 20:
            return (<GiPumpkinMask className={className} />)
        default:
    }
}
