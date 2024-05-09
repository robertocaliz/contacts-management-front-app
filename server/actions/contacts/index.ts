'use server';

import { axiosAuth } from '@/lib/axios/auth/server';
import { Contact, GetAllResponse } from '@/types';
import { ConflictError } from '@/lib/errors';
import { authAction } from '@/lib/safe-action';
import { contactSchema, idSchema, updateContactSchema } from '@/lib/schemas';

export const createContact = authAction(contactSchema, async (contact) => {
    try {
        await axiosAuth.post('/contacts', contact);
        return { success: { message: 'Contacto criado.' } };
    } catch (error) {
        if (error instanceof ConflictError) {
            return {
                errors: error.errors,
            };
        }
        throw error;
    }
});

export const updateContact = authAction(updateContactSchema, async (data) => {
    try {
        await axiosAuth.put(`/contacts/${data.id}`, data);
        return { success: { message: 'Contacto alterado.' } };
    } catch (error) {
        if (error instanceof ConflictError) {
            return {
                errors: error.errors,
            };
        }
        throw error;
    }
});

export const getById = authAction(idSchema, async ({ id: constactId }) => {
    const { data: contact } = await axiosAuth.get<Contact>(
        `/contacts/${constactId}`,
    );
    return contact;
});

export async function fetchContacts(url: string) {
    const { data } = await axiosAuth.get<GetAllResponse>(url);
    return data;
}

export const deleteById = authAction(idSchema, async ({ id: contactId }) => {
    await axiosAuth.delete(`/contacts/${contactId}`);
});