import { LoginForm } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
};

export default function Login() {
    return <LoginForm />;
}
