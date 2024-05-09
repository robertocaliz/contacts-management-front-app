import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUser } from '../../../../../server/actions/users';
import { UserCredentials } from '@/types';
import { NotFoundError } from '@/lib/errors';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as UserCredentials;
                try {
                    const { data, serverError, validationErrors } =
                        await loginUser({
                            email,
                            password,
                        });
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update' && session) {
                return {
                    ...token,
                    ...session.user,
                };
            }
            if (user) {
                return {
                    ...token,
                    ...user,
                };
            }
            return token;
        },
        async session({ session, token, user }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    _id: token._id,
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                },
            };
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
