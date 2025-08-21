import Image from "next/image";
import Link from "next/link";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";

export const Footer = () => {
    return (
        <footer className="relative bg-linear-to-l from-rose-500 via-pink-500 to-purple-700">

            <svg
                className="w-full h-20 "
                viewBox="0 0 500 80"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,30 C150,80 350,0 500,30 L500,00 L0,0 Z"
                    style={{ stroke: "none", fill: "#ffffff" }}
                    className="outline-0"
                />
            </svg>

            <div className="w-screen p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-xs text-white">
                <div className="pl-7 mt-10 sm:mt-5 sm:pl-20">
                    <h1 className="font-extrabold mb-5">CONTACTO</h1>
                    <p className="mb-3">Bogotá, Colombia</p>
                    <p className="mb-5">3136406080 - 3173866890</p>
                    <p className="mb-3">soporte@defiestaconlyly.com</p>
                    <p className="mb-5">ventas@defiestaconlyly.com</p>
                </div>
                <div className="mt-10 sm:mt-5 pl-7 sm:pl-20">
                    <h1 className="font-extrabold mb-5">HORARIO DE ATENCIÓN</h1>
                    <h3 className="font-bold mb-3">Local: </h3>
                    <p className="mb-3">Cra 58 #128 B - 34</p>
                    <p className="mb-3">Lunes a Sábado: 8:00 am a 4pm</p>
                </div>
                <div className="flex flex-col mt-10 sm:mt-5 pl-7 sm:pl-20">
                    <h1 className="font-extrabold mb-5">TÉRMINOS LEALES</h1>
                    <Link href="/politics/terms" className="mb-3 hover:text-lime-300 cursor-pointer">Términos y condiciones</Link>
                    <Link href="/politics/data" className="mb-3 hover:text-lime-300 cursor-pointer">Política de tratamiento de datos</Link>
                    <Link href="/politics/despatch" className="mb-3 hover:text-lime-300 cursor-pointer">Políticas de envío</Link>
                    <div className="flex mt-5">
                        <Link href="https://www.instagram.com/de_fiesta_con_lyly?igsh=c2hhZ2drZmRwbDR1">
                            <IoLogoInstagram className="text-4xl hover:text-lime-300 cursor-pointer mr-3" />
                        </Link>
                        <Link href="https://www.facebook.com/defiestaconlyly">
                            <IoLogoFacebook className="text-4xl hover:text-lime-300 cursor-pointer" />
                        </Link>
                    </div>
                </div>
                <div className="mt-5 sm:mt-0">
                    <Link
                        href="/"
                        className="flex justify-center items-center">
                        <Image src="/imgs/Logo_redondo_sin_fondo.png"
                            className=""
                            width={210}
                            height={210}
                            alt="Logo-DFCL" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
