import { NextRequest, NextResponse } from 'next/server';
import {
    isPublicRoute,
    isPublicRouteExcludeHomeRoute,
} from './functions/app-route';
import { checkIfUserIsAuthenticated } from './functions/session/auth';

export default async function AuthMiddleware(req: NextRequest) {
    const route = req.nextUrl.pathname;
    const homePage = new URL('/', req.url);
    const loginPage = new URL('/login', req.url);
    const isUserAuthenticated = await checkIfUserIsAuthenticated(req);
    if (!isUserAuthenticated) {
        if (isPublicRoute(route)) {
            return NextResponse.next();
        }
        return NextResponse.redirect(loginPage);
    }
    if (isUserAuthenticated && isPublicRouteExcludeHomeRoute(route)) {
        return NextResponse.redirect(homePage);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/(contacts)/:path*', '/', '/login', '/signup', '/profile'],
};
