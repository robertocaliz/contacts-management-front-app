import FormUpdateProfile from '@/components/form-update-profile';
import { getUserData } from '@/functions/session';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: 'Perfíl do utilizador'
};


export default async function UserProfilePage() {

	const userData = await getUserData();
	
	return (
		<FormUpdateProfile
			userData={userData}
		/>
	);
}