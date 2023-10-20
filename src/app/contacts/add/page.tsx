import FormAddContact from '@/components/form-add-contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Adicionar contacto'
};

export default async function AddContactPage() {
	return (
		<FormAddContact />
	);
}