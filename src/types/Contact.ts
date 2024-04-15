import { createContactSchema } from '@/lib/validation-schemas';
import yup from 'yup';

export interface Contact extends yup.InferType<typeof createContactSchema> {
    _id: string;
    createdBy: number;
}
