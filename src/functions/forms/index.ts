import { FieldError } from '@/types';
import { Path, UseFormSetError } from 'react-hook-form';

export const displayMessages = <T extends Record<string, unknown>>(
    errors: FieldError[],
    handler: UseFormSetError<T>,
) => {
    errors.forEach((error) => {
        handler(error.path as Path<T>, {
            message: error.message,
        });
    });
};

export const showValidationErrors = <T extends Record<string, unknown>>(
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
