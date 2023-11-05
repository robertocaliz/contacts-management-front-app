'use client';

import { axiosAuth, axiosPublic } from '@/lib/axios/auth';
import { BadRequestError, ConflictError } from '@/lib/errors';
import { Id, User } from '@/types';


type CreateResData = { emailSend: boolean };


const create = async (user: User) => {
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


const update = async (user: User, userId: Id) => {
	try {
		await axiosAuth.put(`/users/${userId}`, user);
	} catch (error) {
		console.log(error);
		throw error;
	}
};



const checkIfEmailExists = async (email: string) => {
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



const activateAccount = async (activationToken: string) => {
	try {
		const { status } = await axiosPublic.patch(`/signup/activate/${activationToken}`);
		return status;
	} catch (error) {
		if (error instanceof BadRequestError) { 
			return error.status;
		}
		console.log(error);
		throw error;
	}

};



export const UsersProvider = {
	create,
	update,
	checkIfEmailExists,
	activateAccount
};