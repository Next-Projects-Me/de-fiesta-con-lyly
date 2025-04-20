import { titleFont } from "@/config/fonts";
import Link from "next/link";


export const Footer = () => {
    return (
        <div className="flex w-full min-h-80 justify-center items-center text-xs mb-10 bg-primary text-white">
            <Link
                href="/"
            >
                <span className={`${titleFont.className} antialiased font-bold`} >DFCL </span>
                <span>| shop</span>
                <span>© {new Date().getFullYear()}</span>
            </Link>
            <Link
                href='/'
                className="mx-3"
            >
                Privacidad & legal
            </Link>
            <Link
                href='/'
                className="mx-3"
            >
                Ubicaciones
            </Link>

        </div>
    )
}
