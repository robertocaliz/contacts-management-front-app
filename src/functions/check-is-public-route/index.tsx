import { APP_ROUTES } from "@/constants/app-routes"




export const checkIsPublicRoute = (route: string) => {
	const publicRoutes = Object.values(APP_ROUTES.public);
	return publicRoutes.includes(route);
}