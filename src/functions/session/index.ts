import { authOptions } from '@/pages/api/auth/[...nextauth]/route';
import { User } from '@/types';
import { getServerSession } from 'next-auth';



export const getUserData = async () => {
	const session = await getServerSession(authOptions);
	return session?.user as User;
};



export const getAcessToken = async () => {
	const session = await getServerSession(authOptions);
	return session?.user?.accessToken;
};

