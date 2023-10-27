import { User } from '@/types';
import { DefaultSession } from 'next-auth';



declare module 'next-auth' {

	interface Session extends DefaultSession {
		user?: User
	}

}