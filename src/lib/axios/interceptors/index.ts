/* eslint-disable @typescript-eslint/no-explicit-any */

import { updateSession } from '@/functions/session';
import { RefreshAccessTokenResBody } from '@/types';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getCustomError } from '../helper';


type handleUnauthorizedErrorInterceptorProps = {
	refreshAccessToken: () => Promise<RefreshAccessTokenResBody>;
	axiosAuth: (config: AxiosRequestConfig) => Promise<AxiosResponse>
}

export const handleUnauthorizedErrorInterceptor = (
	{ axiosAuth, refreshAccessToken }: handleUnauthorizedErrorInterceptorProps) => {
	return async (error: any) => {
		const originalRequest = error.config;
		if ((error.response.status === StatusCodes.UNAUTHORIZED)
			&& (!originalRequest._retry)) {
			originalRequest._retry = true;
			return await refreshAccessToken()
				.then(async (data) => {
					await updateSession(data);
					originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
					return axiosAuth(originalRequest);
				});
		}
		return Promise.reject(error);
	};
};

export function handleResponseInterceptor() {
	return (response: AxiosResponse) => response;
}

export function handleErrorInterceptor() {
	return (error: any) => {
		const customError = getCustomError(error);
		if (customError) throw customError;
		return Promise.reject(error);
	};
}