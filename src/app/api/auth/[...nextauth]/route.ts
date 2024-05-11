import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUser } from '../../../../../server/actions/users';
import { User, UserCredentials } from '@/types';
import { LoginUnexpectedError, ValidationError } from '@/lib/errors';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as UserCredentials;
                const { data, serverError, validationErrors } = await loginUser(
                    {
                        email,
                        password,
                    },
                );
                if (validationErrors) {
                    throw new ValidationError({ content: validationErrors });
                }
                if (data?.loginError) {
                    throw data.loginError;
                }
                if (serverError) {
                    throw new LoginUnexpectedError({
                        content: serverError,
                    });
                }
                return data?.user as User;
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
