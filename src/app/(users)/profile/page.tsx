import UserProfile from '@/components/user-profile';
import { getUserData } from '@/functions/session';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: 'Perfíl do utilizador'
};


export default async function UserProfilePage() {

	const userData = await getUserData();

	return (
		<UserProfile
			userData={userData}
		/>
	);
}