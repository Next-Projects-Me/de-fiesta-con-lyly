import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {

    return (
        <div className="container-page-form">
            <div className='container-form'>
                <h1 className={`${titleFont.className} text-3xl font-bold mb-5 text-center`}>Ingresar</h1>
                <LoginForm isModalAuth={false} />
            </div>
        </div>
    );
}