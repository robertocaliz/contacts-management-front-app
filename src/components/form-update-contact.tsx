'use client';


import { Contact } from "@/types";
import { useEffect, useState } from "react";
import ContactForm from "./contact-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { StatusCodes } from "http-status-codes";
import Alerts from "@/lib/alerts";
import Spinner from "./spinner";


type FormUpdateContactProps = {
	contactId: number;
}

export default function FormUpdateContact({ contactId }: FormUpdateContactProps) {

	const { register, handleSubmit, reset } = useForm<Contact>();
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [loadingContact, setLoadingContact] = useState(true);


	const onSubmit: SubmitHandler<Contact> = async (contact) => {
		console.log(contact);
	}

	useEffect(() => {
		fetch(`/api/contacts/${contactId}`,
			{
				method: 'GET'
			})
			.then(res => res.json())
			.then(contact => {
				setLoadingContact(false);
				reset(contact);
			})
	}, [contactId, reset, loadingContact])


	if (loadingContact) {
		return <Spinner loading={loadingContact} text="Loading contact..." />
	}

	return (
		<ContactForm
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			register={register}
			disabled={disabled}
			loading={loading}
			buttonContent={'Update contact'}
			header={'Update contact'}
		/>
	)

}