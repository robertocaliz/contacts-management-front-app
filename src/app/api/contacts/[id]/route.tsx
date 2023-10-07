import api from "@/axios/axios-config";
import { WAITING_TIME } from "@/constants";
import wait from "@/lib/wait";
import { ParamsProps } from "@/types";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";


const { INTERNAL_SERVER_ERROR } = StatusCodes;


let contactId: number;


export const DELETE = async (req: Request, { params }: ParamsProps) => {
	contactId = params.id;
	try {
		const { status } = await api.delete(`/contacts/${contactId}`);
		return NextResponse.json({ message: 'Contact deleted!' }, { status });
	} catch (error) {
		console.log(error);
		return NextResponse.json({}, { status: INTERNAL_SERVER_ERROR })
	}
}

export const GET = async (req: Request, { params }: ParamsProps) => {
	contactId = params.id;
	try {
		await wait(WAITING_TIME);
		const { data: contact, status } = await api.get(`/contacts/${contactId}`);
		return NextResponse.json(contact, { status });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{},
			{ status: INTERNAL_SERVER_ERROR }
		);
	}
}


export const PUT = async (req: Request, { params }: ParamsProps) => {
	contactId = params.id;
	try {
		const contact = await req.json();
		const { status } = await api.put(`/contacts/${contactId}`, contact);
		return NextResponse.json({ message: 'Contact updated!' }, { status });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{},
			{ status: INTERNAL_SERVER_ERROR }
		);
	}
}