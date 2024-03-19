import { FieldError } from '@/types';
import { Path, UseFormSetError } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const displayMessages = <T extends Record<string, any>>(
    errors: FieldError[],
    handler: UseFormSetError<T>,
) => {
    errors.forEach((error) => {
        handler(error.path as Path<T>, {
            message: error.message,
        });
    });
};
