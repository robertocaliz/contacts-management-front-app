'use client';

import axios from 'axios';


import { axiosConfig } from '..';
import { getSession } from 'next-auth/react';
import { StatusCodes } from 'http-status-codes';
import { User } from '@/types';
import { updateSession } from '@/functions/update-session';
import { ConflictError } from '@/lib/errors';


const axiosAuthConfig = Object.freeze({
	...axiosConfig,
	baseURL: 'http://localhost:5000'
});



export const axiosAuth = axios.create(axiosAuthConfig);
export const axiosPublic = axios.create(axiosAuthConfig);


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCustomError = (error: any) => {
	switch (error.response.status) {
		case StatusCodes.CONFLICT: {
			return new ConflictError(error.response.data.errors);
		}
	}
};


axiosAuth.interceptors.request.use(async request => {
	const session = await getSession();
	if (!request.headers['Authorization']) {
		request.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
	}
	return request;
});


interface RefreshAccessTokenResBody extends Pick<User, 'accessToken' | 'refreshToken'> { }


const refreshAccessToken = async () => {
	const session = await getSession();
	const refreshToken = session?.user?.refreshToken;
	const { data } = await axiosPublic.post<RefreshAccessTokenResBody>('/refresh_token', { refreshToken });
	return data;
};


axiosAuth.interceptors.response.use(
	(response) => response,
	async (error) => {
		
		const originalRequest = error.config;
		if ((error.response.status === StatusCodes.UNAUTHORIZED
			&& !originalRequest._retry)) {
			originalRequest._retry = true;
			return await refreshAccessToken()
				.then(async (data) => {
					await updateSession(data);
					originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
					return axiosAuth(originalRequest);
				});
		}
		
		const customError = getCustomError(error);
		if(customError) throw customError;
		
		return Promise.reject(error);
	}
);



axiosPublic.interceptors.response.use(
	(response) => response,
	(error) => {
		const customError = getCustomError(error);
		if (customError) throw customError;
		return Promise.reject(error);
	}
);

