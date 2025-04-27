
import { authenticateWithGoogle } from '@/actions/auth/login';
import Image from 'next/image';

export const GoogleButton = () => {

    return (
        <div
            onClick={async () => await authenticateWithGoogle()}
            className="btn-secondary text-center cursor-pointer flex justify-center mb-3">
            <Image
                src="/imgs/Google_logo.png"
                width={25}
                height={25}
                alt='Google logo'
                className='mr-3'
            />
            Ingresa con Google
        </div>
    )
}
