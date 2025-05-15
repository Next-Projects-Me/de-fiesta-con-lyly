'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
import { stringify } from 'querystring';

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
        await signIn('credentials', { email, password, redirect: false });
        return {
            ok: true,
            message: 'Ingresa correctamente'
        }

    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        ok: false,
                        message: 'Credenciales inválidas.'
                    }
                default:
                    return {
                        ok: false,
                        message: 'Error no controlado.'
                    };
            }
        }

        throw error;
    }
}