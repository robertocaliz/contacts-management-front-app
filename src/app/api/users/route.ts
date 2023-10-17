import api from '@/axios/axios-config';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';


export const POST = async (req: Request) => {
	try {
		const user = await req.json();
		const { status } = await api.post('/signup', user);
		return NextResponse.json({}, { status });
	} catch (error) {
		return NextResponse.json(
			{},
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
};