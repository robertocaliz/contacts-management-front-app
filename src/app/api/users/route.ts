import api from "@/axios/axios-config";
import { WAITING_TIME } from "@/constants";
import wait from "@/lib/wait";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";



export const POST = async (req: Request) => {
	try {
		const user = await req.json();
		await wait(WAITING_TIME);
		const { status } = await api.post('/users', user);
		console.log(status)
		return NextResponse.json({ message: 'Account Created!' }, { status });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{},
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
}