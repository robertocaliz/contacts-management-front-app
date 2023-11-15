import { AXIOS_BASE_URL } from '@/constants';




export const axiosConfig = Object.freeze({
	baseURL: AXIOS_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});