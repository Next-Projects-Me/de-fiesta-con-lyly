import { titleFont } from "@/config/fonts";
import { RecoveryPasswordForm } from "./ui/RecoveryPasswordForm";

export default function RecoveryPasswordPage() {
    return (
        <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

            <h1 className={`${titleFont.className} text-3xl font-bold mb-5 text-center`}>Restablecer Contraseña</h1>
            <RecoveryPasswordForm />

        </div>
    );
}