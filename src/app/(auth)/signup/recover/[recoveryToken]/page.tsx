import FormChangePassword from '@/components/form-change-password';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Recuperar Senha',
};

export default function ChangePasswordPage() {
    return <FormChangePassword />;
}
