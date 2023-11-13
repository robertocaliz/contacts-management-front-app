import FormUpdateContact from '@/components/form-update-contact';
import { ContactsProvider } from '@/lib/providers/contacts';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: 'Actualizar contacto'
};

export default async function UpdateContactPage({ params }: ParamsProps) {

	const { id: contactId } = params;


	const contact = await ContactsProvider.getById(contactId);

	return (
		<FormUpdateContact
			contact={contact}
		/>
	);
}