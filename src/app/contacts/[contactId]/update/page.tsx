import { getById } from '@/app/actions/contact';
import { FormUpdateContact } from '@/components';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Actualizar contacto',
};

export default async function UpdateContactPage({ params }: ParamsProps) {
    const contact = await getById(params.contactId);
    return <FormUpdateContact contact={contact} />;
}
