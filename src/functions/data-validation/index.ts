/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldError } from '@/types';
import { Maybe, ObjectSchema, ValidationError } from 'yup';

type ValidateProps = {
    schema: ObjectSchema<Maybe<any>>;
    obj: Record<string, any>;
};

export const validate = async ({ schema, obj }: ValidateProps) => {
    try {
        await schema.validate(obj, { abortEarly: false });
    } catch (error) {
        const yupError = <ValidationError>error;
        const errors: FieldError[] = [];
        const paths = new Set<string>();
        let path: string;
        yupError.inner.forEach((error) => {
            path = String(error.path);
            if (!paths.has(path)) {
                errors.push({
                    path: String(error.path),
                    message: error.message,
                });
                paths.add(path);
            }
        });
        return errors;
    }
};
