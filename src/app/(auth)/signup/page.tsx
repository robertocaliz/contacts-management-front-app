import { SignUpForm } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cadastro',
};

export default function SignUpPage() {
    return <SignUpForm />;
}
