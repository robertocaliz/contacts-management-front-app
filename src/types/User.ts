export interface User {
	_id: string,
	name: string;
	email: string;
	password: string;
	accessToken?: string;
	refreshToken?: string;
}