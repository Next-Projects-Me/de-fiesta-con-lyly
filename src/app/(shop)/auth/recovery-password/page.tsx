import { RecoveryPasswordForm } from "./ui/RecoveryPasswordForm";
import { Title } from "@/components/ui/title/Title";

export default function RecoveryPasswordPage() {
    return (
        <div className="container-page-form">
            <div className="container-form">
                <Title title="Restablecer Contraseña" className="text-center" />
                <RecoveryPasswordForm />
            </div>
        </div>
    );
}