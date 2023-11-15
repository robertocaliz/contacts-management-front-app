'use client';

import axios from 'axios';
import { getSession } from 'next-auth/react';
import { RefreshAccessTokenResBody } from '@/types';
import {
	handleErrorInterceptor,
	handleResponseInterceptor,
	handleUnauthorizedErrorInterceptor
} from '../../interceptors';
import { axiosConfig } from '../..';
import axiosPublic from '../../public';

export const axiosAuth = axios.create(axiosConfig);

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
	handleResponseInterceptor(),
	handleUnauthorizedErrorInterceptor({ axiosAuth, refreshAccessToken })
);

axiosAuth.interceptors.response.use(
	handleResponseInterceptor(),
	handleErrorInterceptor()
);