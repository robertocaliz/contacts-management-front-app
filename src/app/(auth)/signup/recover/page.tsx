import { RecoverSignupForm } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Recuperar cadastro',
};

export default function RecoverSignupPage() {
    return <RecoverSignupForm />;
}
