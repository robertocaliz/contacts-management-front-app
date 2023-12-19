'use server';

import { CREATE_CONTACT_SCHEMA, UPDATE_CONTACT_SCHEMA } from '@/constants/validation-schemas';
import { validate } from '@/functions/validation';
import { axiosAuth } from '@/lib/axios/auth/server';
import { ConflictError } from '@/lib/errors';
import { Contact, Error } from '@/types';
import { StatusCodes } from 'http-status-codes';


type CreateContactReturn = {
	errors?: Error[]
	status?: StatusCodes
};


export async function create(contact: Contact): Promise<CreateContactReturn> {
	const errors = await validate({
		schema: CREATE_CONTACT_SCHEMA,
		obj: contact
	});
	if (errors) {
		return { errors };
	}
	try {

		await axiosAuth.post('/contacts', contact);
		return { errors: undefined };

	} catch (error) {
		if (error instanceof ConflictError) {
			return { errors: error.errors };
		}
		throw error;
	}
}


export async function update(contact: Contact, contactId: string): Promise<CreateContactReturn> {
	const errors = await validate({
		schema: UPDATE_CONTACT_SCHEMA,
		obj: contact
	});
	if (errors) {
		return { errors };
	}
	try {
		await axiosAuth.put(`/contacts/${contactId}`, contact);
		return { errors: undefined };
	} catch (error) {
		if (error instanceof ConflictError) {
			return {
				errors: error.errors
			};
		}
		throw error;
	}
}


export async function getById(constactId: string) {
	console.log('running...');
	const { data: contact } = await axiosAuth.get(`/contacts/${constactId}`);
	return contact;
}


export type GetAllResponse = {
	count: number;
	contacts: Array<Contact>
}


export async function getAll(url: string) {
	const { data } = await axiosAuth.get<GetAllResponse>(url);
	return data;
}


export async function deleteById(contactId: string) {
	await axiosAuth.delete(`/contacts/${contactId}`);
}