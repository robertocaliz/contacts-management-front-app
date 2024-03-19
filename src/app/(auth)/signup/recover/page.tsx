import FormRecoverSignup from '@/components/form-recover-signup';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Recuperar cadastro',
};

export default function RecoverSignupPage() {
    return <FormRecoverSignup />;
}
