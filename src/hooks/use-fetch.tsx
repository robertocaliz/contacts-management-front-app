

import useSWR from "swr";

export const useFetch = <Data = unknown>(url: string) => {
	const { data, isLoading, error } = useSWR<Data>(url, async (url: string) => {
		const res = await fetch(url);
		return await res.json();
	});
	return {
		data,
		isLoading,
		error
	};
};
