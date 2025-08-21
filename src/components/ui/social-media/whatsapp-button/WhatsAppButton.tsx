import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io5";

export const WhatsAppButton = () => {
    return (
        <Link href="https://wa.me/573136406080"
            className="bg-green-400 shadow-black shadow-2xl bottom-5 right-4  sm:right-10 fixed rounded-full w-20 h-20 content-center items-center text-white cursor-pointer hover:bg-white hover:text-green-400">
            <IoLogoWhatsapp
                className="w-10 h-10 ml-5"
            />
        </Link>
    )
}
