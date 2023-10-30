import { Contact, Id } from '@/types';
import { useAny } from './use-any';


export const useContact = (contactId: Id) => {
	const {
		obj: contact,
		isLoading,
		error
	} = useAny<Contact>(`/contacts/${contactId}`);
	return {
		contact,
		isLoading,
		error
	};
};