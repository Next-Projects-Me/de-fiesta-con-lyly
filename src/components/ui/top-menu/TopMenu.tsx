import { CategoriesMenu } from "./ui/CategoriesMenu";
import { NavigationMenu } from "./ui/NavigationMenu";
import { SearchMenu } from "./ui/SearchMenu";
import { SocialMediaMenu } from "./ui/SocialMediaMenu";
import Link from "next/link";
import Image from "next/image";
import { titleFont, titleFont2 } from "@/config/fonts";
import { ModalAuth } from "@/components/auth/modal-auth/ModalAuth";


export const TopMenu = () => {

    return (
        // className="fixed top-0 w-full z-10 bg-white"
        <nav className="fixed top-0 w-full z-10 bg-primary sm:bg-white sm:shadow-none">
            <div id="top-menu" className="grid grid-cols-3 justify-start items-center w-full sm:h-32 mb-3">

                <SocialMediaMenu />

                <div className="">
                    <Link
                        href="/"
                        className="flex justify-center items-center z-10">
                        <Image src="/imgs/Logo_redondo_sin_fondo.png"
                            className="my-2"
                            width={250}
                            height={250}
                            alt="Logo-DFCL" />
                        {/* <p className={`${titleFont.className} text-4xl text-primary`}>DFCL</p> */}
                    </Link>
                </div>

                <SearchMenu />

            </div>

            <NavigationMenu />

            <hr className="sm:hidden border-2 border-primary mt-0 sm:mt-3 " />

            <CategoriesMenu />
            <ModalAuth />
        </nav>
    )
}


