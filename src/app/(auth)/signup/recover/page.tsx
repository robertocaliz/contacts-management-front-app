import FormRecoverSignup from '@/components/recover-signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Recuperar cadastro'
};

export default function RecoverSignupPage() {
	return (
		<FormRecoverSignup />
	);
}