import Centralize from '@/components/centralize';
import UserProfile from '@/components/user-profile';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: 'User profile'
};


export default function UserProfilePage({ params }: ParamsProps) {
	const { id: userId } = params;
	return (<UserProfile userId={userId} />);
}