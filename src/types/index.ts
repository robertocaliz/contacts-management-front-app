import { User } from '.';


export * from './Contact';
export * from './User';
export * from './Params-props';
export * from './User-credentials';
export * from './Id';




export type ConflictErrorT = {
	name: string,
	options: {
		message: string
	}
}




export type SignInResponseError = {
	message: string
	status: number
}

export interface RefreshAccessTokenResBody extends Pick<User, 'accessToken' | 'refreshToken'> { }
