import { NotFoundError, UnauthorizedError } from '@/lib/errors';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';


export const axiosConfig = Object.freeze({
	baseURL: process.env.BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});


const axiosPublic = axios.create(axiosConfig);


axiosPublic.interceptors.response.use(
	(response) => response,
	error => {
		switch (error.response.status) {
			case StatusCodes.UNAUTHORIZED: throw new UnauthorizedError('Access denied!');
			case StatusCodes.NOT_FOUND: throw new NotFoundError('Resource not found!');
		}
		return Promise.reject(error);
	});



export default axiosPublic;