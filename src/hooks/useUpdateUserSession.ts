'use client';

import { User } from '@/types';
import { useSession } from 'next-auth/react';

export const useUpdateUserSession = () => {
    const { data: session, update, status: userStatus } = useSession();

    const updateUserSession = async (userData: Partial<User>) => {
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
        updateUserSession,
        userStatus,
    };
};
