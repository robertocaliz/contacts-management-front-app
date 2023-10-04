import api from "@/axios/axios-config";
import API_ROUTES from "@/constants/api-routes";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";



export const POST = async (req: Request) => {
	const user = await req.json();
	try {
		const { status } = await api.post(API_ROUTES.users.account.create, user);
		return NextResponse.json({ message: 'Account Created!' }, { status })
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Error while creating account' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
}