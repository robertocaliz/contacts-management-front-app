import { FormChangePassword } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Recuperar Senha',
};

export default function ChangePasswordPage() {
    return <FormChangePassword />;
}
