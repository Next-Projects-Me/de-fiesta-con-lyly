import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {

    return (
        <div className="flex flex-col min-h-screen pt-15 sm:pt-20">

            <h1 className={`${titleFont.className} text-3xl font-bold mb-5 text-center `}>Nueva Cuenta</h1>
            <RegisterForm isModalAuth={false} />

        </div>
    );
}