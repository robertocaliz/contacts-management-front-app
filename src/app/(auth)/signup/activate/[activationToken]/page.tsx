
import SinupActivationControl from '@/components/signup-activation-control';
import { Metadata } from 'next';



export const metadata: Metadata = {
	title: 'Activar conta'
};


export default function ActivateUserAcountPage() {
	return (
		<SinupActivationControl />
	);
}