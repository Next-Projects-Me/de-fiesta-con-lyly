import { titleFont2 } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";


export const Footer = () => {
    return (
        <footer>
            <div className="w-screen p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-xs bg-primary text-white">
                <div className="pl-7 mt-10 sm:mt-5 sm:pl-20">
                    <h1 className="font-extrabold mb-5">CONTACTO</h1>
                    <p className="mb-3">Bogotá, Colombia</p>
                    <p className="mb-5">3136406080 - 3173866890</p>

                    <p className="mb-3">soporte@defiestaconlyly.com</p>
                    <p className="mb-5">ventas@defiestaconlyly.com</p>

                    <p>Cra 58 #128 B - 34</p>
                </div>
                <div className="mt-10 sm:mt-5 pl-7 sm:pl-20">
                    <h1 className="font-extrabold mb-5">HORARIO DE ATENCIÓN</h1>
                    <h3 className="font-bold mb-3">Locales: </h3>
                    <p className="mb-3">Lunes a Sábado: 8:30 am a 7pm</p>
                    <p className="mb-3">Domingos: 9am a 3pm</p>

                    <p></p>
                    <p className="mb5"></p>
                    <p></p>
                </div>
                <div className="mt-10 sm:mt-5 pl-7 sm:pl-20">
                    <h1 className="font-extrabold mb-5">TÉRMINOS LEALES</h1>
                    <p className="mb-3 hover:text-lime-300 cursor-pointer">Términos y condiciones</p>
                    <p className="mb-3 hover:text-lime-300 cursor-pointer">Política de tratamiento de datos</p>
                    <p className="mb-3 hover:text-lime-300 cursor-pointer">Políticas de envío</p>
                    <div className="flex mt-5">
                        <IoLogoInstagram className="text-4xl hover:text-lime-300 cursor-pointer mr-3" />
                        <IoLogoFacebook className="text-4xl hover:text-lime-300 cursor-pointer" />
                    </div>
                </div>
                <div className="mt-10 sm:mt-5">
                    <Link
                        href="/"
                        className="flex justify-center items-center">
                        <Image src="/imgs/Logo_redondo_sin_fondo.png"
                            className="my-2"
                            width={200}
                            height={200}
                            alt="Logo-DFCL" />
                    </Link>
                </div>

            </div>
            <div className="flex justify-center items-center text-primary">
                <Image
                    className="m-2"
                    width={30}
                    height={30}
                    alt="Imagen de piñata de burrito"
                    src="/imgs/Pinata-burrito.png"
                />
                <Link
                    href="/"
                >
                    <span className={`${titleFont2.className} antialiased font-bold`} >De Fiesta Con Lyly </span>
                    <span>| shop</span>
                    <span>© {new Date().getFullYear()}</span>
                </Link>
            </div>
        </footer>
    )
}
