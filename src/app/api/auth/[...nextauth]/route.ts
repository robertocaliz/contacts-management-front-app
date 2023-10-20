/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from 'next-auth/next';
import api from '@/lib/axios/axios-config';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User, UserCredentials } from '@/types';
import { AuthenticationError, UnauthorizedError } from '@/lib/errors';


export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as UserCredentials;
				try {
					const {
						data: user,
					} = await api.post<User>('/login', { email, password });
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					return user as any;
				} catch (error) {
					if (error instanceof UnauthorizedError) {
						throw new AuthenticationError('Email ou senha inválida.');
					}
					console.log(error);
					throw new AuthenticationError('Erro de autenticação.');
				}
			}
		}),
	],
	callbacks: {
		async jwt({ token, user, session }) {
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
					id: token.id,
					accessToken: token.accessToken

				}
			};
		}
	}
};



const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };