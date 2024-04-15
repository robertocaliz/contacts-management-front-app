import {
    emailSchema,
    loginSchema,
    signupSchema,
    updatePasswordSchema,
} from '@/lib/validation-schemas';
import { User } from '.';
import { Contact } from './Contact';
import yup from 'yup';

export * from './Contact';
export * from './User';
export * from './ParamsProps';

export type UserCredentials = yup.InferType<typeof loginSchema>;

export type AccountData = yup.InferType<typeof signupSchema>;

export type Passwords = yup.InferType<typeof updatePasswordSchema>;

export type RecoverSignupType = yup.InferType<typeof emailSchema>;

export type FieldError = {
    path: string;
    message: string;
};

export type SignInError = {
    message: string;
    status: number;
};

export interface RefreshAccessTokenResBody
    extends Pick<User, 'accessToken' | 'refreshToken'> {}

export type GetAllResponse = {
    count: number;
    contacts: Array<Contact>;
};

export type SelectOption = {
    value: string;
    content: string;
};
