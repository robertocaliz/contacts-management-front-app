import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';


type Error = {
	message: string;
};

export const useAny = <T>(url: string) => {
	const [obj, setObj] = useState<T>();
	const [error, setError] = useState<Error>();
	const [isLoading, setIsLoading] = useState(true);
	const loadAny = () => {
		fetch(url,
			{
				method: 'GET',
			})
			.then(res => {
				return (res.status === StatusCodes.OK) ? res.json() : Promise.reject(res.json());
			})
			.then(obj => setObj(obj))
			.catch(error => setError(error))
			.finally(() => setIsLoading(false));
	}
	useEffect(loadAny, [url]);
	return {
		obj,
		error,
		isLoading
	};
}