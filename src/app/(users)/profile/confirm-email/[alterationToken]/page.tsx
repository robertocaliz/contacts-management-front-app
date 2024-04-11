import { EmailChangeConfirmationControl } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Confirmar alteração',
};

export default function ConfirmEmailAlterationPage() {
    return <EmailChangeConfirmationControl />;
}
