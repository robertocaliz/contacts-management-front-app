import api from "@/axios/axios-config";
import { WAITING_TIME } from "@/constants";
import wait from "@/lib/wait";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server"


export const POST = async (req: Request) => {
	const contact = await req.json();
	try {
		await wait(WAITING_TIME);
		const { status } = await api.post('/contacts', contact);
		return NextResponse.json(
			{ message: 'Contact created!' },
			{ status }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Error while creating contact!' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		)
	}
}


export const GET = async () => {
	try {
		await wait(WAITING_TIME);
		const { data: contacts, status } = await api.get('/contacts');
		return NextResponse.json(contacts, { status });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Error trying to get contacts!' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		)
	}
}