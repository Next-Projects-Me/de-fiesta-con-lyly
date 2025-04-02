import { titleFont, paragraph } from "@/config/fonts";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { RiWhatsappFill } from "react-icons/ri";

export default function Home() {
    return (
        <div className="grid grid-cols-1 w-screen md:grid-cols-2 bg-secondary">

            <div className="flex justify-center justify-items-center items-center col-span-1 h-screen ">
                <div className={`text-center text-primary`}>
                    <div className={`${titleFont.className} font-bold text-4xl text-wrap`}>
                        <p>SITIO WEB EN</p>
                        <p>CONSTRUCCCIÓN</p>
                    </div>
                    <div className={`w-80 sm:w-auto my-10 px-3 text-2xl sm:px-6 sm:my-16`}>
                        <p>
                            Próximamente estará disponible nuestra página web dónde podrás conocer
                            todos nuestros productos disponibles para tu celebración...
                            Estamos felices de cada día crecer junto a ti... Gracias por tu apoyo
                        </p>
                    </div>
                    <div className={`${paragraph.className} mx-auto flex justify-center items-center text-xl bg-white rounded-2xl w-80 h-36`}>
                        <div>
                            <h2 className={`${titleFont.className} font-bold text-2xl`}>
                                CONTÁCTANOS
                            </h2>
                            <div className="flex justify-center items-center mt-2">
                                <RiWhatsappFill className="w-6 h-6" />
                                <span className="ml-2">
                                    <p>3136406080 - 3173866890</p>
                                </span>
                            </div>

                            <div className="flex justify-center items-center text-xl">
                                <IoLocationSharp className="w-7 h-7" />
                                <span className="ml-1">
                                    <p>CRA 58 #128 B - 34</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center col-span-1 h-screen bg-secondary">
                <Image
                    src="/imgs/logo_in_construction.png"
                    width={550}
                    height={550}
                    alt="Imagen de una pinata de burrro y mensaje 'under construction' "
                />
            </div>
        </div >
    );
}