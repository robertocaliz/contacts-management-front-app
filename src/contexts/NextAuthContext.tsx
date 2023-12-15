'use client';


import { TWENTY_SECONDS } from '@/constants';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';


type NextAuthSessionProviderProps = {
	children?: ReactNode
}


export default function NextAuthSessionProvider({ children }: NextAuthSessionProviderProps) {
	return (
		<SessionProvider refetchInterval={TWENTY_SECONDS}>
			{children}
		</SessionProvider>
	);
} 