
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
	const [runSpinner, setRunSpinner] = useState(false);
	const [disable, setDisable] = useState(false);

	const onSubmit: SubmitHandler<Contact> = (contact) => {
		setRunSpinner(true);
		setDisable(true);
		fetch('/api/contacts',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(contact)
			})
			.then(res => {
				return (res.status === StatusCodes.CREATED) ? res.json() : Promise.reject();
			})
			.then(resBody => Alerts.success(resBody.message))
			.catch(() => {
				Alerts.error('Error while creating contact');
			})
			.finally(() => {
				setRunSpinner(false);
				setDisable(false);
				reset();
			});
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
						disable={disable}
						runSpinner={runSpinner}
						content='Create contact'
						spinnerText='Creating...'
					/>
				</form>
				<hr />
			</Centralize>
		</>
	);

}