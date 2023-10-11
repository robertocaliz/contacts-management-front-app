import api from '@/axios/axios-config';
import { WAITING_TIME } from '@/constants';
import { NotFoundError } from '@/lib/errors';
import wait from '@/lib/wait';
import { ParamsProps } from '@/types';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';



export const GET = async (req: Request, { params }: ParamsProps) => {
	const userId = params.id;
	try {
		await wait(WAITING_TIME);
		const { data: user, status } = await api.get(`/users/${userId}`);
		return NextResponse.json(user, { status });
	} catch (error) {
		if (error instanceof NotFoundError) {
			return NextResponse.json({ error: 'User not found!' }, { status: error.status })
		}
		return NextResponse.json(
			{},
			{ status: StatusCodes.INTERNAL_SERVER_ERROR });
	}
};