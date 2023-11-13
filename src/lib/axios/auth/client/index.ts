'use client';

import axios from 'axios';


import { axiosConfig } from '../..';
import { getSession } from 'next-auth/react';
import { RefreshAccessTokenResBody } from '@/types';
import { getCustomError } from '../../helper';
import { refreshAcessToken } from '../../interceptors';


const axiosAuthConfig = Object.freeze({
	...axiosConfig,
	baseURL: 'http://localhost:5000'
});



export const axiosAuth = axios.create(axiosAuthConfig);
export const axiosPublic = axios.create(axiosAuthConfig);


axiosAuth.interceptors.request.use(async request => {
	if (!request.headers['Authorization']) {
		const session = await getSession();
		request.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
	}
	return request;
});



const refreshAccessToken = async () => {
	const session = await getSession();
	const refreshToken = session?.user?.refreshToken;
	const { data } = await axiosPublic.post<RefreshAccessTokenResBody>('/refresh_token', { refreshToken });
	return data;
};



axiosAuth.interceptors.response.use(
	(response) => response,
	refreshAcessToken({
		axiosObj: axiosAuth,
		refreshAccessToken
	})
);


axiosAuth.interceptors.response.use(
	(response) => response,
	(error) => {
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

