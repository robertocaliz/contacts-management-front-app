import { UpdatePasswordForm } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Recuperar Senha',
};

export default function ChangePassword() {
    return <UpdatePasswordForm />;
}
