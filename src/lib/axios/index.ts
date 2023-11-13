import axios from 'axios';
import { getCustomError } from './helper';


export const axiosConfig = Object.freeze({
	baseURL: process.env.AXIOS_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});


const axiosPublic = axios.create(axiosConfig);


axiosPublic.interceptors.response.use(
	(response) => response,
	error => {
		const customError = getCustomError(error);
		if (customError) throw customError;
		return Promise.reject(error);
	});



export default axiosPublic;