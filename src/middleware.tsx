import { NextRequest, NextResponse } from "next/server";
import { checkIfUserIsAuthenticated } from "./lib/auth";


export default async function AuthMiddleware(req: NextRequest) {


	const loginPathname = new URL('/login', req.url);


	const isUserAuthenticated = await checkIfUserIsAuthenticated(req);


	if (isUserAuthenticated) {
		return NextResponse.next();
	}

	return NextResponse.redirect(loginPathname)

} 

export const config = {
	matcher: [
		'/dashboard',
		'/contacts/:path*',
		'/api/:path*'
	]
}