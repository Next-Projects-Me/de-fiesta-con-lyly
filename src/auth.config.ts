import prisma from './lib/prisma';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.data = user;
            }
            return token;
        },
        session({ session, token }) {
            session.user = token.data as any;
            return session;
        }
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;
                const { email, password } = parsedCredentials.data;

                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

                if (!user) return null;
                if (!bcryptjs.compareSync(password, user.password)) return null;

                // regresar usuario sin password
                const { password: _, ...rest } = user;

                return rest;
            },
        }),
    ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig); 