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
		yupError.inner.forEach((error) => {
			const _error = errors.find((_error) => _error.path === error.path);
			if (!_error) {
				errors.push({
					path: String(error.path),
					message: error.message,
				});
			}
		});
		return errors;
	}
};
