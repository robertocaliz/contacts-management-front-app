
'use client';

import Alerts from "@/lib/alerts";
import { Contact } from "@/types";
import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ContactForm from "./contact-form";


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
		<ContactForm
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			register={register}
			disabled={disabled}
			loading={loading}
			buttonContent={'Create contact'}
		/>
	);

}