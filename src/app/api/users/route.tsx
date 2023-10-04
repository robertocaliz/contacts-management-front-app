import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";



export const POST = async (req: Request) => {
	const user = await req.json();
	try {

		const x = await new Promise(resolve => {
			setTimeout(() => {
				resolve(0);
			}, 4000)
		});


		console.log(user);

		return NextResponse.json({ message: 'Account Created!' }, { status: StatusCodes.CREATED })


	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: 'Error while creating account' }, { status: StatusCodes.INTERNAL_SERVER_ERROR })
	}
}