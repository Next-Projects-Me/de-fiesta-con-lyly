import { titleFont } from "@/config/fonts";
import { RecoveryPasswordForm } from "./ui/RecoveryPasswordForm";

export default function RecoveryPasswordPage() {
    return (
        <div className="container-page-form">
            <div className="container-form">
                <h1 className={`${titleFont.className} text-3xl font-bold mb-5 text-center`}>Restablecer Contraseña</h1>
                <RecoveryPasswordForm />
            </div>
        </div>
    );
}