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


const { OK } = StatusCodes;


type FormUpdateContactProps = {
	contactId: number;
}


export default function FormUpdateContact({ contactId }: FormUpdateContactProps) {

	const { register, handleSubmit, reset } = useForm<Contact>();
	const [runSpinner, setRunSpinner] = useState(false);
	const [disable, setDisable] = useState(false);
	const [loadingContact, setLoadingContact] = useState(true);
	const { back } = useRouter();

	const onSubmit: SubmitHandler<Contact> = (contact) => {
		setRunSpinner(true);
		setDisable(true);
		fetch(`/api/contacts/${contactId}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(contact)
			})
			.then(async res => {
				return (res.status === OK) ? res.json() : Promise.reject();
			})
			.then(resBody => {
				reset();
				back();
				Alerts.success(resBody.message);
				return;
			})
			.catch(() => {
				Alerts.error('Error loading contact');
			})
			.finally(() => {
				setRunSpinner(false);
				setDisable(false);
			});
	}

	useEffect(() => {
		fetch(`/api/contacts/${contactId}`,
			{
				method: 'GET'
			})
			.then(async res => {
				return (res.status === OK) ? res.json() : Promise.reject();
			})
			.then(contact => reset(contact))
			.catch(() => {
				Alerts.error('Error loading contact!');
			})
			.finally(() => setLoadingContact(false));
	}, [contactId, reset, loadingContact]);


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
						disable={disable}
						runSpinner={runSpinner}
						content='Update contact'
						spinnerText='Updating...'
					/>
				</form>
				<hr />
			</Centralize>
		</>
	)

}