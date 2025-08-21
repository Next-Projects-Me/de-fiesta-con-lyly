import { LoginForm } from './ui/LoginForm';
import { Title } from '@/components/ui/title/Title';

export default function LoginPage() {

    return (
        <div className="container-page-form">
            <div className='container-form'>
                <Title title='Ingresar' className='text-center' />
                <LoginForm isModalAuth={false} />
            </div>
        </div>
    );
}