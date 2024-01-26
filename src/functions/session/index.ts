import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@/types';
import { getServerSession } from 'next-auth';
import { getCsrfToken, getSession } from 'next-auth/react';

export const getUserData = async () => {
	const session = await getServerSession(authOptions);
	return {
		_id: session?.user?._id,
		name: session?.user?.name,
		email: session?.user?.email,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as Record<string, any>;
};

export const getAcessToken = async () => {
	const session = await getServerSession(authOptions);
	return session?.user?.accessToken;
};

export const updateSessionUser = async (userData: Partial<User>) => {
	const csrfToken = await getCsrfToken();
	await getSession({
		req: {
			body: {
				csrfToken,
				data: {
					user: { ...userData },
				},
			},
		},
	});
};
