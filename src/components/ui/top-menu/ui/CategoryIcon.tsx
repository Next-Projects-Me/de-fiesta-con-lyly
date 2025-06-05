import { BiSolidHappyBeaming } from "react-icons/bi";
import { FaChild, FaTheaterMasks } from "react-icons/fa";
import { GiBatMask, GiBowTieRibbon, GiGlassCelebration, GiPartyHat, GiPartyPopper, GiRolledCloth } from "react-icons/gi";
import { IoBalloon } from "react-icons/io5";
import { TbRating18Plus } from "react-icons/tb";
import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";

interface Props {
    icon: number;
    className: string;
}

export const CategoryIcon = ({ icon, className }: Props) => {

    switch (icon) {
        case 1:
            return (
                <GiBowTieRibbon className={className} />
            )
        case 2:
            return (
                <FaChild className={className} />
            )
        case 3:
            return (
                <TbRating18Plus className={className} />
            )
        case 4:
            return (
                <GiPartyPopper className={className} />
            )
        case 5:
            return (
                <IoBalloon className={className} />
            )
        case 6:
            return (
                <GiGlassCelebration className={className} />
            )
        case 7:
            return (
                <FaTheaterMasks className={className} />
            )
        case 8:
            return (
                <GiPartyHat className={className} />
            )
        case 9:
            return (
                <GiBatMask className={className} />
            )
        case 10:
            return (
                <BiSolidHappyBeaming className={className} />
            )
        case 11:
            return (
                <GiRolledCloth className={className} />
            )

        default:
        case 1:
            return (
                <TfiLayoutWidthDefaultAlt className={className} />
            )
    }
}
