import LoginForm from '@/components/form-login';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: 'Login'
};

export default function LoginPage() {
	return (
		<LoginForm
		/>
	);
}