import { titleFont } from "@/config/fonts";
import { ChangePasswordForm } from "./ui/ChangePasswordForm";

export default async function ChangePasswordPage() {

    return (
        <div className="container-page-form">
            <div className="container-form">
                <h1 className={`${titleFont.className} text-3xl font-bold mb-5 text-center`}>Actualizar Contraseña</h1>
                <ChangePasswordForm />
            </div>
        </div>
    );
}
