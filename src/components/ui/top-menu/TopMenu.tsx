import { CategoriesMenu } from "./ui/CategoriesMenu";
import { ModalAuth } from "../modal-auth/ModalAuth";
import { NavigationMenu } from "./ui/NavigationMenu";
import { SearchMenu } from "./ui/SearchMenu";
import { SocialMediaMenu } from "./ui/SocialMediaMenu";
import Link from "next/link";


export const TopMenu = () => {

    return (
        <nav>
            <div id="top-menu" className="grid grid-cols-3 items-center w-full mb-3">

                <SocialMediaMenu />

                <div className="">
                    <Link
                        href="/"
                        className="flex justify-center items-center">
                        <img src="/imgs/Logo_redondo.jpeg" className="w-72 my-2" />
                    </Link>
                </div>

                <SearchMenu />

            </div>

            <NavigationMenu />

            <hr className="border-2 border-primary mt-0 sm:mt-3" />

            <CategoriesMenu />
            <ModalAuth />
        </nav>
    )
}


