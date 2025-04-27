'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {

        // console.log({ login: Object.fromEntries(formData), prev: prevState });

        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false
        });

        return 'Success';

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function authenticateWithGoogle() {
    try {

        await signIn('google', { callbackUrl: '/' });

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


export const login = async (email: string, password: string) => {

    try {
        await signIn('Credentials', { email, password });
        return { ok: true }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo realizar el logueo'
        }
    }
}