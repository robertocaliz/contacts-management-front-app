/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from 'next-auth/next';
import axiosPublic from '@/lib/axios/public';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User, UserCredentials } from '@/types';
import { AuthError, BadRequestError, ForbiddenError, UnauthorizedError } from '@/lib/errors';
import { getErrorMessage } from '@/functions/sign-in-error';
import { StatusCodes } from 'http-status-codes';
import { validate } from '@/functions/validation';
import { LOGIN_SCHEMA } from '@/constants/validation-schemas';


export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as UserCredentials;
				const errors = await validate({
					obj: { email, password },
					schema: LOGIN_SCHEMA
				});
				if (errors) {
					throw new BadRequestError(
						getErrorMessage(
							JSON.stringify(errors),
							StatusCodes.BAD_REQUEST
						)
					);
				}
				try {
					const { data: user, } = await axiosPublic.post<User>(
						'/login',
						{ email, password }
					);
					return user as any;
				} catch (error) {
					if (error instanceof UnauthorizedError) {
						throw new UnauthorizedError(
							getErrorMessage(
								`Email ou senha inválida.
								Verifique as suas credênciais e tente novamente.`,
								error.status
							)
						);
					}
					if (error instanceof ForbiddenError) {
						throw new ForbiddenError(
							getErrorMessage(
								`Sua conta encontra-se inactiva.
							Acesse o seu e-mail para ativar a sua conta
							atravez do email que acabamos de enviar.`,
								error.status
							)
						);
					}
					throw new AuthError(
						getErrorMessage(
							(error as AuthError).message,
							StatusCodes.INTERNAL_SERVER_ERROR
						)
					);
				}
			}
		})
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