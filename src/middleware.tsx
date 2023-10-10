import { NextRequest, NextResponse } from 'next/server';
import { checkIfUserIsAuthenticated } from './lib/auth';
import { isPublicRoute } from './functions/is-public-route';


export default async function AuthMiddleware(req: NextRequest) {


	const loginPage = new URL('/login', req.url);
	const dashboardPage = new URL('/dashboard', req.url);


	const isUserAuthenticated = await checkIfUserIsAuthenticated(req);


	const route = req.nextUrl.pathname;


	if (!isUserAuthenticated) {
		if (isPublicRoute(route)) {
			return NextResponse.next();
		}
		return NextResponse.redirect(loginPage)
	}

	if (isUserAuthenticated && isPublicRoute(route)) {
		return NextResponse.redirect(dashboardPage);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/dashboard',
		'/contacts/:path*',
		'/api/contacts',
		'/api/users/(\\d{1,})',
		'/login',
		'/',
		'/signup'
	]
}