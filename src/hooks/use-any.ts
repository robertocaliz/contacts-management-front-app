
import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';


type Error = {
	message: string;
};

export const useAny = <T>(url: string) => {
	const [obj, setObj] = useState<T>();
	const [error, setError] = useState<Error>();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		fetch(url,
			{
				method: 'GET'
			})
			.then(async (res) => {
				const resBody = await res.json();
				return (res.status === StatusCodes.OK) ?
					resBody :
					Promise.reject(resBody);
			})
			.then(obj => setObj(obj))
			.catch(error => setError(error))
			.finally(() => setIsLoading(false));
	}, [url]);
	return {
		obj,
		error,
		isLoading
	};
};