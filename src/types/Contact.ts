import { contactSchema } from '@/lib/schemas';
import z from 'zod';

export interface Contact extends z.infer<typeof contactSchema> {
    _id: string;
    createdBy: number;
}
