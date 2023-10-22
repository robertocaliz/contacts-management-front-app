
import { axiosAuth } from '@/lib/axios/auth';
import { useEffect, useState } from 'react';



export const useAny = <T>(url: string) => {
	const [obj, setObj] = useState<T>();
	const [error, setError] = useState<Error>();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		axiosAuth
			.get(url)
			.then(({ data }) => setObj(data))
			.catch(error => setError(error))
			.finally(() => setIsLoading(false));
	}, [url]);
	return {
		obj,
		error,
		isLoading
	};
};