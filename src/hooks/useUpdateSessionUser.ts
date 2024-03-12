'use client';

import { User } from '@/types';
import { useSession } from 'next-auth/react';

export const useUpdateSessionUser = () => {
	const { data: session, update, status: userStatus } = useSession();

	const updateSessionUser = async (userData: Partial<User>) => {
		await update({
			...session,
			user: {
				...session?.user,
				...userData,
			},
		}).then(() => update());
	};

	return {
		session,
		updateSessionUser,
		userStatus,
	};
};
