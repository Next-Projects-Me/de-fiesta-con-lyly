import { ChangePasswordForm } from "./ui/ChangePasswordForm";
import { Title } from "@/components/ui/title/Title";

export default async function ChangePasswordPage() {

    return (
        <div className="container-page-form">
            <div className="container-form">
                <Title title="Actualizar Contraseña" className="text-center" />
                <ChangePasswordForm />
            </div>
        </div>
    );
}
