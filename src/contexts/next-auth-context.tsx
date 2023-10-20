'use client';


import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type NextAuthProviderProps = {
	children?: ReactNode
}


export default function NextAuthContext({ children }: NextAuthProviderProps) {
	return <SessionProvider>{children}</SessionProvider>;
} 