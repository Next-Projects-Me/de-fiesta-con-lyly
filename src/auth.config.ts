import prisma from './lib/prisma';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig: NextAuthConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
        }),
        CredentialsProvider({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;
                const { email, password } = parsedCredentials.data;

                const user = await prisma.user.findUnique({ where: { email: email.toLowerCase(), google: false } });

                if (!user) return null;
                if (!bcryptjs.compareSync(password, user.password)) return null;

                const { password: _, ...rest } = user;
                return rest;
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     return true;
        // },
        async jwt({ token, user, profile }) {

            if (profile) {

                if (profile.email_verified) {
                    const googleUser = await prisma.user.findUnique({ where: { email: user.email! } });
                    if (!googleUser) {
                        const userRegistered = await prisma.user.create({
                            data: {
                                name: profile.name!,
                                email: profile.email!.toLowerCase(),
                                password: '',
                                image: profile.picture,
                                google: true
                            },
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                role: true
                            }
                        })

                        token.id = userRegistered.id;
                        token.role = userRegistered.role;
                    }
                }
                else throw new Error("El usuario de Google no está verificado ");
            }

            if (user) {
                token.data = user;
            }

            return token;
        },
        async session({ session, token }) {
            session.user = token.data as any;
            return session;
        },
        async redirect() {
            return '/';
        }
    },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig); 