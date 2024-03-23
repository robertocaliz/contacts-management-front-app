import { FormAddContact } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Adicionar contacto',
};

export default async function AddContactPage() {
    return <FormAddContact />;
}
