import FormAddContact from '@/components/form-add-contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Add contact'
}

export default function AddContactPage() {

	return (
		<FormAddContact />
	);
}