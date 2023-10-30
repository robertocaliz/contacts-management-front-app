import { ConflictErrorT } from '@/types';
import { Path, UseFormSetError } from 'react-hook-form';



export const displayConflictErrors = <T extends object>(errors: Array<ConflictErrorT>, handler: UseFormSetError<T>) => {
	errors.forEach(error => {
		handler(error.name as Path<T>, error.options);
	});
};