import { FieldError } from '@/types';
import { Path, UseFormSetError } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showErrors = <T extends Record<string, any>>(
    errors: FieldError[],
    handler: UseFormSetError<T>,
) => {
    errors.forEach((error) => {
        handler(error.path as Path<T>, {
            message: error.message,
        });
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showValidationErrors = <T extends Record<string, any>>(
    validationErrors: Record<string, string[]>,
    setError: UseFormSetError<T>,
) => {
    const fields = Object.keys(validationErrors);
    fields.forEach((field) => {
        setError(field as Path<T>, {
            message: validationErrors[field][0],
        });
    });
};
/* eslint-disable @typescript-eslint/no-explicit-any */

type ObjectChangedProps = {
    originalObj: Record<string, any>;
    newObj: Record<string, any>;
};

export const objChanged = ({ originalObj, newObj }: ObjectChangedProps) => {
    const keys = Object.keys(originalObj);
    for (const key of keys) {
        if (originalObj[key] !== newObj[key]) {
            return true;
        }
    }
    return false;
};
