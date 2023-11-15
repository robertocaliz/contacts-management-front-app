/* eslint-disable @typescript-eslint/no-explicit-any */

import { updateSession } from '@/functions/session';
import { RefreshAccessTokenResBody } from '@/types';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getCustomError } from '../helper';



type RefreshAccessTokenParams = {
	refreshAccessToken: () => Promise<RefreshAccessTokenResBody>;
	axiosObj: (config: AxiosRequestConfig) => Promise<AxiosResponse<any, any>>
}


export const handleAuthErrorInterceptor = (
	{ axiosObj, refreshAccessToken }: RefreshAccessTokenParams) => {
	return async (error: any) => {
		const originalRequest = error.config;
		if ((error.response?.status === StatusCodes.UNAUTHORIZED
			&& !originalRequest._retry)) {
			originalRequest._retry = true;
			return await refreshAccessToken()
				.then(async (data) => {
					await updateSession(data);
					originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
					return axiosObj(originalRequest);
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