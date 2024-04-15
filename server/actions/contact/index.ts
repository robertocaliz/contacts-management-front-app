'use server';

import {
    createContactSchema,
    updateContactSchema,
} from '@/lib/validation-schemas';
import { MZPhoneNumber } from '@/functions/formatting';
import { validate } from '@/functions/data-validation';
import { axiosAuth } from '@/lib/axios/auth/server';
import { ConflictError } from '@/lib/errors';
import { Contact, GetAllResponse } from '@/types';

export async function create(contact: Contact) {
    const errors = await validate({
        schema: createContactSchema,
        obj: contact,
    });
    if (errors) {
        return { errors };
    }
    contact.phoneNumber = MZPhoneNumber.format(contact.phoneNumber);
    try {
        await axiosAuth.post('/contacts', contact);
        return { errors };
    } catch (error) {
        if (error instanceof ConflictError) {
            return { errors: error.errors };
        }
        throw error;
    }
}

export async function update(contact: Contact, contactId: string) {
    const errors = await validate({
        schema: updateContactSchema,
        obj: contact,
    });
    if (errors) {
        return { errors };
    }
    contact.phoneNumber = MZPhoneNumber.format(contact.phoneNumber);
    try {
        await axiosAuth.put(`/contacts/${contactId}`, contact);
        return { errors: undefined };
    } catch (error) {
        if (error instanceof ConflictError) {
            return {
                errors: error.errors,
            };
        }
        throw error;
    }
}

export async function getById(constactId: string) {
    const { data: contact } = await axiosAuth.get<Contact>(
        `/contacts/${constactId}`,
    );
    contact.phoneNumber = MZPhoneNumber.normalize(contact.phoneNumber);
    return contact;
}

export async function getAll(url: string) {
    const { data } = await axiosAuth.get<GetAllResponse>(url);
    return data;
}

export async function deleteById(contactId: string) {
    await axiosAuth.delete(`/contacts/${contactId}`);
}
