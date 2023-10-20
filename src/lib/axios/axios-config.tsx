
import { getAcessToken } from '@/functions/session';
import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';



const api = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});



api.interceptors.request.use(async request => {
	if (!request.headers.Authorization) {
		const accessToken = await getAcessToken();
		request.headers.Authorization = `Bearer ${accessToken}`;
	}
	return request;

});



api.interceptors.response.use(null, error => {
	switch (error.response?.status) {
	case StatusCodes.UNAUTHORIZED: throw new UnauthorizedError('Access denied!');
	case StatusCodes.NOT_FOUND: throw new NotFoundError('Resource not found!');
	}
	return Promise.reject(error);
});



export default api;