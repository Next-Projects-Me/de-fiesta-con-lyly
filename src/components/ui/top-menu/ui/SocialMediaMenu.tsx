import { FaSquareFacebook, FaSquareInstagram } from "react-icons/fa6";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";

export const SocialMediaMenu = () => {
    return (
        <div className="flex justify-center items-center">
            <Link href="/" className="hidden sm:block">
                <FaSquareInstagram className="w-14 h-14 text-pink-600 hover:scale-120" />
            </Link>
            <Link href="/" className="hidden sm:block">
                <FaSquareFacebook className="w-14 h-14 text-blue-600 hover:scale-120" />
            </Link>
            <button className="block sm:hidden">
                <IoMenuOutline className="w-10 h-10 text-primary cursor-pointer" />
            </button>
        </div>
    )
}
