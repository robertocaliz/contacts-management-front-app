import FormUpdateContact from '@/components/form-update-contact';
import { ParamsProps } from '@/types';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: 'Actualizar contacto'
};


export default function UpdateContactPage({ params }: ParamsProps) {

	const contactId = params.id;

	return (
		<FormUpdateContact contactId={contactId} />
	);
}