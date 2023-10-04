import api from "@/axios/axios-config";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthenticationError, UnauthorizedError } from "./errors";
import User from "@/types/user";


type Credentials = {
	email: string;
	password: string;
}


export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as Credentials;
				try {
					const {
						data: user,
					} = await api.post<User>('/signin', { email, password });
					console.log(user);
					return user as any;
				} catch (error) {
					if (error instanceof UnauthorizedError) {
						throw new AuthenticationError('Invalid e-mail or password');
					}
					console.log(error);
					throw new AuthenticationError('Error trying to authenticate user!');
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
				}
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
			}
		}
	}
	,
	pages: {
		signIn: '/auth/signin',
	}
};