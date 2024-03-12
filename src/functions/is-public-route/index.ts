import { PUBLIC_ROUTES } from '@/constants';

export const isPublicRoute = (pathname: string) => {
	return PUBLIC_ROUTES.includes(pathname);
};
