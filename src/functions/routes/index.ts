import { PUBLIC_ROUTES } from '@/constants';

export const isPublicRoute = (route: string) => {
    return PUBLIC_ROUTES.includes(route);
};

export const isPublicRouteExcludeHomeRoute = (route: string) => {
    return route === '/' ? false : isPublicRoute(route);
};
