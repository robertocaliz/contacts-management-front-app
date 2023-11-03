/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from 'next-auth/next';
import axiosPublic from '@/lib/axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User, UserCredentials } from '@/types';
import { AuthenticationError, ForbiddenError, UnauthorizedError } from '@/lib/errors';
import { getSignInError } from '@/functions/sign-in-error';
import { StatusCodes } from 'http-status-codes';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';


export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as UserCredentials;
				try {
					const {
						data: user,
					} = await axiosPublic.post<User>('/login', { email, password });
					return user as any;
				} catch (error) {
					if (error instanceof UnauthorizedError) {
						throw new UnauthorizedError(
							getSignInError(
								`Email ou senha inválida.
								Verifique as suas credênciais e tente novamente.`,
								error.status)
						);
					}
					if (error instanceof ForbiddenError) {
						throw new ForbiddenError(
							getSignInError(
								`Sua conta encontra-se inactiva.
							Acesse o seu e-mail para ativar a sua conta
							atravez do email que acabamos de enviar.`,
								error.status)
						);
					}
					console.log(error);
					throw new AuthenticationError(
						getSignInError(
							GLOBAL_ERROR_MESSAGE,
							StatusCodes.INTERNAL_SERVER_ERROR)
					);
				}
			}
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === 'update') {
				return {
					...token,
					...session.user
				};
			}
			if (user) {
				return {
					...token,
					...user
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
					refreshToken: token.refreshToken
				}
			};
		}
	}
};



const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };