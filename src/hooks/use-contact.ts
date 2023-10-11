import { Contact } from "@/types";
import { useAny } from "./use-any";


export const useContact = (contactId: number) => {
	const {
		obj: contact,
		isLoading,
		error
	} = useAny<Contact>(`/api/contacts/${contactId}`);
	return {
		contact,
		isLoading,
		error
	};
}