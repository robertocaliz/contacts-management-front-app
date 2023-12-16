
import { Error } from '@/types';
import { Path, UseFormSetError } from 'react-hook-form';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const displayErrors = <T extends Record<string, any>>(errors: Error[], handler: UseFormSetError<T>) => {
	errors.forEach(error => {
		handler(error.name as Path<T>, { message: error.message });
	});
};
