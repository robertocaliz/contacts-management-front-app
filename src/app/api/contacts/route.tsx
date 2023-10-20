import api from '@/lib/axios/axios-config';
import { NextResponse } from 'next/server';


export const POST = async (req: Request) => {
	const contact = await req.json();
	try {
		const { status } = await api.post('/contacts', contact);
		return NextResponse.json(
			{ message: 'Contact created!' }, { status }
		);
	} catch (error) {
		console.log(error);
		throw error;
	}
};


export const GET = async () => {
	try {
		const { data: contacts, status } = await api.get('/contacts');
		return NextResponse.json(contacts, { status });
	} catch (error) {
		console.log(error);
		throw error;
	}
};