import { User } from '.';
import { Contact } from './Contact';

export * from './Contact';
export * from './User';
export * from './ParamsProps';
export * from './UserCredentials';
export * from './Id';

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
