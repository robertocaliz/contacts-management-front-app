import api from "@/axios/axios-config";
import { WAITING_TIME } from "@/constants";
import wait from "@/lib/wait";
import { ParamsProps } from "@/types";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";


export const DELETE = async (req: Request, { params }: ParamsProps) => {
	return NextResponse.json({ message: 'Contact deleted!' }, { status: StatusCodes.OK });
}


export const GET = async (req: Request, { params }: ParamsProps) => {
	const contactId = params.id;
	try {
		await wait(WAITING_TIME);
		const { data: contact, status } = await api.get(`/contacts/${contactId}`);
		return NextResponse.json(contact, { status });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{},
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
}


export const PUT = async (req: Request, { params }: ParamsProps) => {
	return NextResponse.json({ message: 'Contact updated' }, { status: StatusCodes.OK });
}