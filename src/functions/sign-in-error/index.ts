import { LoginError } from '@/types';

export const getLoginCustomError = (message: string, status: number) => {
    return { message, status } as LoginError;
};
