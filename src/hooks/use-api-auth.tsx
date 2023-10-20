

import { axiosAuth } from '@/lib/axios/axios-config';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';



const useAxiosAuth = () => {

	const { data: session } = useSession();

	useEffect(() => {
		const requestIntercept = axiosAuth.interceptors.request.use(config => {
			if (!config.headers['Authorization']) {
				config.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
			}
			return config;
		});
		return () => {
			axiosAuth.interceptors.request.eject(requestIntercept);
		};
	}, [session]);


	return {
		sessionLoaded: session ? true : false,
		axiosAuth
	};

};



export default useAxiosAuth;