import FormUpdateProfile from '@/components/form-update-profile';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: 'Perfíl do utilizador'
};


export default async function UserProfilePage() {

	return (
		<FormUpdateProfile />
	);
}