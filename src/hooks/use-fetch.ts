

import { axiosAuth } from '@/lib/axios/auth/client';
import useSWR from 'swr';


export const useFetch = <Data = unknown>(url: string) => {
	return useSWR<Data>(url, async (url: string) => {
		const res = await axiosAuth.get(url);
		return res.data;
	});
};
