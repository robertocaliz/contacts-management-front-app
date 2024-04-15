import { signupSchema } from '@/lib/validation-schemas';
import yup from 'yup';

export interface User extends yup.InferType<typeof signupSchema> {
    _id: string;
    accessToken?: string;
    refreshToken?: string;
}
