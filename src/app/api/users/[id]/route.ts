import api from '@/lib/axios/axios-config';
import { NotFoundError } from '@/lib/errors';
import { ParamsProps } from '@/types';
import { NextResponse } from 'next/server';



let userId: number;



export const GET = async (req: Request, { params }: ParamsProps) => {
	userId = params.id;
	try {
		const { data: user, status } = await api.get(`/users/${userId}`);
		return NextResponse.json(user, { status });
	} catch (error) {
		console.log(error);
		if (error instanceof NotFoundError) {
			return NextResponse.json({ error: 'Usuário não encontrado!' }, { status: error.status });
		}
		throw error;
	}
};



export const PUT = async (req: Request, { params }: ParamsProps) => {
	userId = params.id;
	const user = await req.json();
	try {
		const { status } = await api.put(`/users/${userId}`, user);
		return NextResponse.json({ message: 'Usuário actualizado!' }, { status });
	} catch (error) {
		console.log(error);
		throw error;
	}
};