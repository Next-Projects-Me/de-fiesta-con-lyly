import { Title } from '@/components/ui/title/Title';
import { AddressForm } from './ui/AddressForm';
import { auth } from '@/auth.config';
import { getUserAddress } from '@/actions/address/get-user-address';
import { getDepartments } from '@/actions/departments/get-departments';
import { getCities } from '@/actions/cities/get-cities';

export default async function AddressPage() {

    const departments = await getDepartments();
    const cities = await getCities();

    const session = await auth();
    if (!session?.user) {
        return (
            <h3 className='text-5xl'>500 - No hay sesión de usuario</h3>
        )
    }

    const userAddress = await getUserAddress(session.user.id) ?? undefined;

    return (
        <div className="flex flex-col sm:justify-center sm:items-center mb-10 px-10 sm:px-0">
            <div className="w-full xl:w-[1000px] flex flex-col justify-center text-left">
                <Title title="Dirección" subtitle="Dirección de entrega" />
                <AddressForm departments={departments} cities={cities} userStoredAddress={userAddress} />
            </div>
        </div>
    );
}