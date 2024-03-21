import { RegEx } from '@/constants';

export const isValidEmail = (email: string) => {
    return RegEx.app.EMAIL.test(email);
};
