

import { axiosAuth } from '@/lib/axios/auth/client';
import useSWR from 'swr';


export const useFetch = <Data = unknown>(url: string | null) => {
	const { data, isLoading, error } = useSWR<Data>(url, async (url: string) => {
		const res = await axiosAuth.get(url);
		return await res.data;
	});
	return {
		data: data ?? [],
		isLoading,
		error
	};
};
