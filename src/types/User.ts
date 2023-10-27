export interface User {
	_id: number,
	name: string;
	email: string;
	password: string;
	accessToken?: string;
	refreshToken?: string;
}