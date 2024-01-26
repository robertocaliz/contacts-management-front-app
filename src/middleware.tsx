import { NextRequest, NextResponse } from 'next/server';
import { isPublicRoute } from './functions/is-public-route';
import { checkIfUserIsAuthenticated } from './functions/session/auth';

export default async function AuthMiddleware(req: NextRequest) {
	const loginPage = new URL('/login', req.url);

	const isUserAuthenticated = await checkIfUserIsAuthenticated(req);
	const route = req.nextUrl.pathname;

	if (!isUserAuthenticated) {
		if (isPublicRoute(route)) {
			return NextResponse.next();
		}
		return NextResponse.redirect(loginPage);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/(contacts|users|dashboard)/:path*',
		'/api/contacts',
		'/api/users/(\\d{1,})',
		'/login',
		'/',
		'/signup',
	],
};
