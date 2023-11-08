'use client';

import { axiosAuth, axiosPublic } from '@/lib/axios/auth';
import { BadRequestError, ConflictError, NotFoundError } from '@/lib/errors';
import { Id, User } from '@/types';


type SendMail = { emailSend: boolean };


const create = async (user: User) => {
	try {
		const { data: resBody, status } = await axiosPublic.post<SendMail>('/signup', user);
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


const _checkIfEmailExists = async (email: string) => {
	try {
		const { data: resBody, status } = await axiosPublic.post<SendMail>('/recover-sinup', { email });
		return { resBody, status };
	} catch (error) {
		if ((error instanceof NotFoundError)) {
			return {
				status: error.status
			};
		}
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



const changePassword = async ({
	newPassword, recoveryToken
}: { recoveryToken: string, newPassword: string }) => {
	try {
		const { status } = await axiosPublic.patch(`/users/${recoveryToken}`, { newPassword });
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
	activateAccount,
	_checkIfEmailExists,
	changePassword
};