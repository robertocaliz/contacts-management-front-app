import { User } from '@/types';
import { getSession, getCsrfToken } from 'next-auth/react';

export const updateSession = async (userDetails: Partial<User>) => {
    const csrfToken = await getCsrfToken();
    await getSession({
        req: {
            body: {
                csrfToken,
                data: {
                    user: { ...userDetails },
                },
            },
        },
    });
};
