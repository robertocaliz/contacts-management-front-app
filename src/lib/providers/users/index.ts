'use client';

import { axiosAuth, axiosPublic } from '@/lib/axios/auth';
import { ConflictError } from '@/lib/errors';
import { Id, User } from '@/types';


type CreateResData = { emailSend: boolean };


export const create = async (user: User) => {
	try {
		const { data: resBody, status } = await axiosPublic.post<CreateResData>('/signup', user);
		return { resBody, status };
	} catch (error) {
		if (error instanceof ConflictError) {
			return {
				status: error.status,
				errors: error.errors
			};
		}
		console.log(error);
		throw error;
	}
};


export const update = async (user: User, userId: Id) => {
	try {
		await axiosAuth.put(`/users/${userId}`, user);
	} catch (error) {
		console.log(error);
		throw error;
	}
};



export const checkIfEmailExists = async (email: string) => {
	try {
		const { status } = await axiosPublic.post<boolean>('/checkemail', { email });
		return { status };
	} catch (error) {
		if (error instanceof ConflictError) {
			return {
				status: error.status,
				errors: error.errors
			};
		}
		console.log(error);
		throw error;
	}
};



export const UsersProvider = {
	create,
	update,
	checkIfEmailExists
};