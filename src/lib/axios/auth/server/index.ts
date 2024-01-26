import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { RefreshAccessTokenResBody } from '@/types';
import { axiosConfig } from '../..';
import axiosPublic from '../../public';
import {
	handleErrorInterceptor,
	handleResponseInterceptor,
	handleUnauthorizedErrorInterceptor,
} from '../../interceptors';

export const axiosAuth = axios.create(axiosConfig);

axiosAuth.interceptors.request.use(async (request) => {
	if (!request.headers['Authorization']) {
		const session = await getServerSession(authOptions);
		request.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
	}
	return request;
});

const refreshAccessToken = async () => {
	const session = await getServerSession(authOptions);
	const refreshToken = session?.user?.refreshToken;
	const { data } = await axiosPublic.post<RefreshAccessTokenResBody>(
		'/refresh_token',
		{ refreshToken },
	);
	return data;
};

axiosAuth.interceptors.response.use(
	handleResponseInterceptor(),
	handleUnauthorizedErrorInterceptor({ axiosAuth, refreshAccessToken }),
);

axiosAuth.interceptors.response.use(
	handleResponseInterceptor(),
	handleErrorInterceptor(),
);
