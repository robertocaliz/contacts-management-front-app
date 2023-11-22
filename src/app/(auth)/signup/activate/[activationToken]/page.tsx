import AlertActiveAccount from '@/components/alert-active-account';
import { Metadata } from 'next';



export const metadata: Metadata = {
	title: 'Activar conta'
};


export default function ActivateUserAcountPage() {
	return (
		<AlertActiveAccount />
	);
}