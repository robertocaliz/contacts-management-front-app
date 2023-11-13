

import axios from 'axios';


import { axiosConfig } from '../..';
import { StatusCodes } from 'http-status-codes';
import { User } from '@/types';
import { updateSession } from '@/functions/update-session';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCustomError } from '../../helper';


const axiosAuthConfig = Object.freeze({
	...axiosConfig,
	baseURL: process.env.AXIOS_BASE_URL
});



export const axiosAuth = axios.create(axiosAuthConfig);
export const axiosPublic = axios.create(axiosAuthConfig);


axiosAuth.interceptors.request.use(async request => {
	const session = await getServerSession(authOptions);
	if (!request.headers['Authorization']) {
		request.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
	}
	return request;
});


interface RefreshAccessTokenResBody extends Pick<User, 'accessToken' | 'refreshToken'> { }


const refreshAccessToken = async () => {
	const session = await getServerSession(authOptions);
	const refreshToken = session?.user?.refreshToken;
	const { data } = await axiosPublic.post<RefreshAccessTokenResBody>('/refresh_token', { refreshToken });
	return data;
};


axiosAuth.interceptors.response.use(
	(response) => response,
	async (error) => {
		console.error(error.response.status);
		const originalRequest = error.config;
		if ((error.response?.status === StatusCodes.UNAUTHORIZED
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
		if (customError) throw customError;

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

