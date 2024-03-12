import { getById } from '@/app/actions/contact';
import FormUpdateContact from '@/components/form-update-contact';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Actualizar contacto',
};

export default async function UpdateContactPage({ params }: ParamsProps) {
	const { id: contactId } = params;

	const contact = await getById(contactId);

	return <FormUpdateContact contact={contact} />;
}
