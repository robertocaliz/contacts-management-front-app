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
const axiosPublic = axios.create(axiosAuthConfig);



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


		switch (error.response.status) {
			case StatusCodes.CONFLICT: throw new ConflictError();
		}

		return Promise.reject(error);
	}
);

