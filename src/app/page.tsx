import { titleFont } from "@/config/fonts";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Home() {
    return (
        <div className="grid sm:grid-cols-2 grid-cols-1 p-10 h-screen text-secondary">
            <div className="flex flex-col items-center justify-center text-center">
                <h1 className={`${titleFont.className} text-4xl font-bold mb-10`}>SITIO WEB EN CONSTRUCCIÓN</h1>
                <p className="text-center text-2xl mb-10">
                    Próximamente estará disponible nuestra página web dónde podrás conocer todos nuestros productos
                    disponibles para tu celebración... Estamos felices de cada día crecer junto a ti...
                    Gracias por tu apoyo
                </p>
                <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-center">
                    <p className={`${titleFont.className} text-2xl font-bold mb-4`}>CONTÁCTANOS</p>
                    <div className="flex flex-row items-center justify-center text-xl">
                        <IoLogoWhatsapp className="mr-2" />
                        <p>3136406080 - 3173866890</p>
                    </div>
                    <div className="flex flex-row items-center justify-center text-xl">
                        <FaLocationDot className="mr-2" />
                        <p>CRA 58 #128 B - 34</p>
                    </div>

                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-10">
                <Image src="/images/logo_in_construction.png" alt="Logo" width={600} height={600} />
            </div>
        </div>
    );
}
