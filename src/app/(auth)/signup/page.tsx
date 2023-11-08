import SignUpForm from '@/components/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cadastro'
};


export default function SignUpPage() {
	return (
		<SignUpForm />
	);
}