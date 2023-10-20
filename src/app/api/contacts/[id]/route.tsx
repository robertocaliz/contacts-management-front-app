import api from '@/lib/axios/axios-config';
import { ParamsProps } from '@/types';
import { NextResponse } from 'next/server';


let contactId: number;


export const DELETE = async (req: Request, { params }: ParamsProps) => {
	contactId = params.id;
	try {
		const { status } = await api.delete(`/contacts/${contactId}`);
		return NextResponse.json({ message: 'Contact deleted!' }, { status });
	} catch (error) {
		console.log(error);
		throw error;
	}
};


export const GET = async (req: Request, { params }: ParamsProps) => {
	contactId = params.id;
	try {
		const { data: contact, status } = await api.get(`/contacts/${contactId}`);
		return NextResponse.json(contact, { status });
	} catch (error) {
		console.log(error);
		throw error;
	}
};


export const PUT = async (req: Request, { params }: ParamsProps) => {
	contactId = params.id;
	try {
		const contact = await req.json();
		const { status } = await api.put(`/contacts/${contactId}`, contact);
		return NextResponse.json({ message: 'Contact updated!' }, { status });
	} catch (error) {
		console.log(error);
		throw error;
	}
};