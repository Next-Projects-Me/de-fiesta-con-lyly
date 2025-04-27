import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {

    return (
        <div className="container-page-form">
            <div className='container-form'>
                <h1 className={`${titleFont.className} text-3xl font-bold mb-5 text-center `}>Nueva Cuenta</h1>
                <RegisterForm isModalAuth={false} />
            </div>
        </div>
    );
}