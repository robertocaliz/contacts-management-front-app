import { ParamsProps } from "@/types";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";


export const DELETE = async (req: Request, { params }: ParamsProps) => {
	console.log(params.id);
	return NextResponse.json({ message: 'Contact deleted!' }, { status: StatusCodes.OK });
}


export const GET = async (req: Request, { params }: ParamsProps) => {

	await new Promise(resolve => {
		setTimeout(() => {
			resolve(0)
		}, 4000);
	});


	return NextResponse.json({
		id: 1,
		name: 'Roberto Caliz',
		email: 'robertocaliz@gmail.com',
		phoneNumber: '844215602'
	}, { status: StatusCodes.OK });

}