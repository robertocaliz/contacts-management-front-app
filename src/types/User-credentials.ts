import { User } from '.';


export interface UserCredentials extends Pick<User, 'email' | 'password'> { }