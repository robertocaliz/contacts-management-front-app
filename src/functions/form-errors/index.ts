import { ConflictErrorT } from '@/types';
import { Path, UseFormSetError } from 'react-hook-form';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const displayConflictErrors = <T extends Record<string, any>>(errors: Array<ConflictErrorT>, handler: UseFormSetError<T>) => {
	errors.forEach(error => {
		handler(error.name as Path<T>, error.options);
	});
};



export const cleanConflictError = <T extends object>(name: Path<T>, handler: UseFormSetError<T>) => {
	handler(name, {
		message: ''
	});
};