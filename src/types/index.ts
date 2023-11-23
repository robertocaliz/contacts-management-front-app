
import { User } from '.';


export * from './Contact';
export * from './User';
export * from './Params-props';
export * from './User-credentials';
export * from './Id';




export type Error = {
	name: string,
	message: string
}


export type SignInError = {
	message: string
	status: number
}


export interface RefreshAccessTokenResBody extends Pick<User, 'accessToken' | 'refreshToken'> { }


export interface UseFetchData<T> {
	count: number;
	objs: T[];
}


