
'use client';

import Alerts from "@/lib/alerts";
import { Contact } from "@/types";
import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Centralize from "./centralize";
import { ButtonBack, SubmitButton } from "./buttons.component";
import FormHeader from "./form-header";
import Input from "./input";


export default function FormAddContact() {

	const { register, handleSubmit, reset } = useForm<Contact>();
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const onSubmit: SubmitHandler<Contact> = async (contact) => {
		setLoading(true);
		setDisabled(true);
		const response = await fetch('/api/contacts',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(contact)
			});
		const { message } = await response.json();
		setLoading(false);
		setDisabled(false);
		if (response.status === StatusCodes.CREATED) {
			reset();
			Alerts.success(message);
			return;
		}
		Alerts.error(message);
	}

	return (
		<>
			<Centralize>
				<ButtonBack />
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormHeader text='Add Contact' />
					<Input
						type='text'
						name='name'
						label='Name:'
						register={register}
					/>
					<Input
						type='email'
						name='email'
						label='Email:'
						register={register}
					/>
					<Input
						type='text'
						name='phoneNumber'
						label='Phone number:'
						register={register}
					/>
					<SubmitButton
						disabled={disabled}
						loading={loading}
						content='Create contact'
						spinnerText='Creating...'
					/>
				</form>
				<hr />
			</Centralize>
		</>
	);

}