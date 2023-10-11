import { User } from '@/types';
import { useAny } from './use-any';

export const useUser = (userId: number) => {
	const {
		obj,
		error,
		isLoading
	} = useAny<User>(`/api/users/${userId}`);
	return {
		obj,
		error,
		isLoading
	};
}