import { getCities } from "@/actions/cities/get-cities";
import { getDepartments } from "@/actions/departments/get-departments";
import { auth } from "@/auth.config";
import { Title } from "@/components/ui/title/Title";
import { OtherAddressForm } from "./ui/OtherAddressForm";

export default async function OtherAddressPage() {

    const departments = await getDepartments();
    const cities = await getCities();

    const session = await auth();
    if (!session?.user) {
        return (
            <h3 className='text-5xl'>500 - No hay sesión de usuario</h3>
        )
    }

    return (
        <div className="flex flex-col justify-center text-left border-interface p-5 mx-5 sm:mx-0 mt-8 sm:mt-5 mb-10">
            <Title title="Dirección Alternativa" subtitle="¿A dónde quieres enviar tu pedido?" />
            <OtherAddressForm departments={departments} cities={cities} />
        </div>
    );
}