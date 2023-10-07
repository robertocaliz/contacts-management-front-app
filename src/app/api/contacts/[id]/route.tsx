import wait from "@/lib/wait";
import { ParamsProps } from "@/types";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";


export const DELETE = async (req: Request, { params }: ParamsProps) => {
	console.log(params.id);
	return NextResponse.json({ message: 'Contact deleted!' }, { status: StatusCodes.OK });
}


export const GET = async (req: Request, { params }: ParamsProps) => {
	await wait(4000);
	return NextResponse.json({
		id: 1,
		name: 'Roberto Caliz',
		email: 'robertocaliz@gmail.com',
		phoneNumber: '844215602'
	}, { status: StatusCodes.OK });

}



export const PUT = async (req: Request, { params }: ParamsProps) => {
	return NextResponse.json({ message: 'Contact updated' }, { status: StatusCodes.OK });
}