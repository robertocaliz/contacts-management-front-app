import AlertActiveAccount from '@/components/alert-active-account';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';



export const metadata: Metadata = {
	title: 'Activar conta'
};


export default function ActivateUserAcountPage({ params }: ParamsProps) {

	return <AlertActiveAccount activationToken={params.activationToken} />;
}