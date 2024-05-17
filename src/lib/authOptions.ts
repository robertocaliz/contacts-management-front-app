import {
    INVALID_CREADENTIALS_ERROR,
    INACTIVE_ACCOUNT_ERROR,
} from '@/constants';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserCredentials } from '@/types';
import { NextAuthOptions } from 'next-auth';
import { loginUser } from '../../server/actions/users';
import {
    ValidationError,
    InvalidCredentialsError,
    InactiveAcountError,
    LoginUnexpectedError,
} from './errors';

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
                if (data?.invalidCredentialsError) {
                    throw new InvalidCredentialsError({
                        content: INVALID_CREADENTIALS_ERROR,
                    });
                }
                if (data?.inactiveAcountError) {
                    throw new InactiveAcountError({
                        content: INACTIVE_ACCOUNT_ERROR,
                    });
                }
                if (serverError) {
                    throw new LoginUnexpectedError({
                        content: serverError,
                    });
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return data?.user as any;
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
