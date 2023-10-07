'use client';


import { Contact } from "@/types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StatusCodes } from "http-status-codes";
import Alerts from "@/lib/alerts";
import Spinner from "./spinner";
import { useRouter } from "next/navigation";
import Centralize from "./centralize";
import { ButtonBack, SubmitButton } from "./buttons.component";
import FormHeader from "./form-header";
import Input from "./input";



type FormUpdateContactProps = {
	contactId: number;
}


export default function FormUpdateContact({ contactId }: FormUpdateContactProps) {

	const { register, handleSubmit, reset } = useForm<Contact>();
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [loadingContact, setLoadingContact] = useState(true);
	const { back } = useRouter();

	const onSubmit: SubmitHandler<Contact> = async (contact) => {
		setLoading(true);
		setDisabled(true);
		const response = await fetch(`/api/contacts/${contactId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(contact)
		})
		const { message } = await response.json();
		setLoading(false);
		setDisabled(false);
		if (response.status === StatusCodes.OK) {
			reset();
			back();
			Alerts.success(message);
			return;
		}
		Alerts.error(message);
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
		return <Spinner loading={loadingContact} text='Loading contact...' />
	}

	return (
		<>
			<Centralize>
				<ButtonBack />
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormHeader text={'Update Contact'} />
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
						content='Update contact'
						spinnerText='Updating...'
					/>
				</form>
				<hr />
			</Centralize>
		</>
	)

}