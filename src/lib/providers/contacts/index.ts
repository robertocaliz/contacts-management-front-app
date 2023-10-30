'use client';

import { axiosAuth } from '@/lib/axios/auth';
import { ConflictError } from '@/lib/errors';
import { Contact, Id } from '@/types';



const create = async (contact: Contact) => {
	try {
		const { status } = await axiosAuth.post('/contacts', contact);
		return { status };
	} catch (error) {
		if (error instanceof ConflictError) {
			return {
				errors: error.errors,
				status: error.status
			};
		}
		console.log(error);
		throw error;
	}
};



export const del = async (contactId: Id) => {
	try {
		await axiosAuth.delete(`/contacts/${contactId}`);
	} catch (error) {
		console.log(error);
		throw error;
	}
};


export const update = async (contact: Contact, contactId: Id) => {
	try {
		const { status } = await axiosAuth.put(`/contacts/${contactId}`, contact);
		return { status };
	} catch (error) {
		if (error instanceof ConflictError) {
			return {
				errors: error.errors,
				status: error.status
			};
		}
		console.log(error);
		throw error;
	}
};


export const ContactsProvider = {
	create,
	update,
	del
};