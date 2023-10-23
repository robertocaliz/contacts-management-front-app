'use client';

import axiosPublic from '@/lib/axios';
import { axiosAuth } from '@/lib/axios/auth';
import { Id, User } from '@/types';



export const create = async (user: User) => {
	try {
		const { data: id } = await axiosPublic.post<Id>('/signup', user);
		return id;
	} catch (error) {
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



export const UsersProvider = {
	create,
	update
};