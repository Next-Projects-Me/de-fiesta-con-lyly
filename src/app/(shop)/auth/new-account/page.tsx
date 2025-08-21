import { RegisterForm } from './ui/RegisterForm';
import { Title } from '@/components/ui/title/Title';

export default function NewAccountPage() {

    return (
        <div className="container-page-form">
            <div className='container-form'>
                <Title title='Nueva Cuenta' className='text-center' />
                <RegisterForm isModalAuth={false} />
            </div>
        </div>
    );
}