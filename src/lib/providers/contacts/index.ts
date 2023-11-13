


import { axiosAuth } from '@/lib/axios/auth/client';
import { axiosAuth as axiosAuthServer } from '@/lib/axios/auth/server';
import { ConflictError, NotFoundError } from '@/lib/errors';
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

const getById = async (constactId: Id) => {
	console.log(constactId);
	try {
		const { data: contact } = await axiosAuthServer.get(`/contacts/${constactId}`);
		return contact;
	} catch (error) {
		if (error instanceof NotFoundError) {
			console.log('My error:', error);
			return;
		}

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
	del,
	getById
};