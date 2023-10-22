'use client';

import { axiosAuth } from '@/lib/axios/auth';
import { Contact, Id } from '@/types';



const create = async (contact: Contact) => {
	try {
		const { data: id } = await axiosAuth.post<Id>('/contacts', contact);
		return id;
	} catch (error) {
		console.log('Erro');
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
		await axiosAuth.put(`/contacts/${contactId}`, contact);
	} catch (error) {
		console.log(error);
		throw error;
	}
};




export const ContactsProvider = {
	create,
	update,
	del
};