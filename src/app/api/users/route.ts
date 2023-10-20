import api from '@/lib/axios/axios-config';
import { NextResponse } from 'next/server';


export const POST = async (req: Request) => {
	try {
		const user = await req.json();
		const { status } = await api.post('/signup', user);
		return NextResponse.json({}, { status });
	} catch (error) {
		console.log(error);
		throw error;
	}
};