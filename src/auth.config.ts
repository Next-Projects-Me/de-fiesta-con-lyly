import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import prisma from './lib/prisma';

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

                const newUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: "",
                    emailVerified: user.emailVerified,
                    roleId: user.roleId,
                    image: user.image,
                    google: user.google,
                }

                return newUser;
            },
        }),
    ],
    // cookies: {
    //     sessionToken: {
    //         name: `__Secure-next-auth.session-token`,
    //         options: {
    //             httpOnly: true,
    //             sameSite: 'lax', // o 'none' si usas HTTPS con dominios cruzados
    //             path: '/',
    //             secure: true,
    //         },
    //     },
    // },
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

                    const googleUser = await prisma.user.findUnique({
                        where: {
                            email: user.email!.toLowerCase()
                        },
                    });

                    if (!googleUser) {

                        const role = await prisma.role.findFirst({
                            where: {
                                name: 'user'
                            },
                        });

                        if (!role) {
                            throw new Error("No existe el rol de usuario");
                        }

                        const userRegistered = await prisma.user.create({
                            data: {
                                name: profile.name!,
                                email: profile.email!.toLowerCase(),
                                password: '',
                                image: profile.picture,
                                google: true,
                                roleId: role.id
                            },
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                roleId: true
                            }
                        })

                        token.id = userRegistered.id;
                        token.roleId = userRegistered.roleId;
                    }
                    else {
                        token.id = googleUser.id;
                        token.roleId = googleUser.roleId;
                    }
                }
                else throw new Error("El usuario de Google no está verificado.");
            }

            if (user) {
                token.data = user;
            }

            return token;
        },
        async session({ session, token }) {

            const newUser = {
                id: token.id,
                name: token.name,
                email: token.email,
                roleId: token.roleId,
                image: token.picture,
            }

            if (!token.roleId) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                session.user = token.data as any;
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                session.user = newUser as any;
            }

            return session;
        },
        async redirect() {
            return '/';
        }
    },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig); 