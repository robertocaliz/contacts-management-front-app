import axios from 'axios';
import {
	handleErrorInterceptor,
	handleResponseInterceptor,
} from '../interceptors';
import { axiosConfig } from '..';

const axiosPublic = axios.create(axiosConfig);

axiosPublic.interceptors.response.use(
	handleResponseInterceptor(),
	handleErrorInterceptor(),
);

export default axiosPublic;
