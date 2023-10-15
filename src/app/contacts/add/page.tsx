import FormAddContact from '@/components/form-add-contact';
import { getAuthenticatedUserId } from '@/functions/authenticated-user-id';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Add contact'
}

export default async function AddContactPage() {
	const authenticatedUserId = await getAuthenticatedUserId();
	return (
		<FormAddContact authenticatedUserId={authenticatedUserId} />
	);
}