
import NextAuth from 'next-auth/next';
import api from '@/axios/axios-config';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { WAITING_TIME } from '@/constants';
import { User, UserCredentials } from '@/types';
import { AuthenticationError, UnauthorizedError } from '@/lib/errors';
import wait from '@/lib/wait';



export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as UserCredentials;
				try {
					await wait(WAITING_TIME);
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