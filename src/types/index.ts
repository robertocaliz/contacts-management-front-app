import { loginSchema, passwordsSchema, signupSchema } from '@/lib/schemas';
import { User } from '.';
import { Contact } from './Contact';

import z from 'zod';

export * from './Contact';
export * from './User';
export * from './ParamsProps';

export type UserCredentials = z.infer<typeof loginSchema>;

export type SignupData = z.infer<typeof signupSchema>;

export type Passwords = z.infer<typeof passwordsSchema>;

export type FieldError = {
    path: string;
    message: string;
};

export type SignInError = {
    content: string | Record<string, string[]>;
    validdationErrors?: boolean;
    invalidCredentialsError?: boolean;
    inactiveAccountError?: boolean;
    serverError?: boolean;
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
