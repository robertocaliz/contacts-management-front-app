import { ParamsProps } from "@/types";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";


export const DELETE = async (req: Request, { params }: ParamsProps) => {
	console.log(params.id);
	return NextResponse.json({ message: 'Contact deleted!' }, { status: StatusCodes.OK });
}