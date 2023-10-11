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
import { BiIdCard, BiMessage, BiPhone } from "react-icons/bi";
import { useContact } from "@/hooks";


const { OK } = StatusCodes;


export default function FormUpdateContact({ contactId }: { contactId: number }) {

	const { register, handleSubmit, reset } = useForm<Contact>();
	const [runSpinner, setRunSpinner] = useState(false);
	const [disable, setDisable] = useState(false);
	const { back } = useRouter();


	const {
		contact,
		error,
		isLoading
	} = useContact(contactId);

	useEffect(() => {
		reset(contact);
	}, [contact, reset]);


	if (isLoading) return <Spinner loading={isLoading} text='Loading contact...' />
	if (error) return <h1>Error!</h1>


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
			.then(res => {
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


	if (isLoading) {
		return <Spinner loading={isLoading} text='Loading contact...' />
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
						startAdornment={<BiIdCard />}
					/>
					<Input
						type='email'
						name='email'
						label='Email:'
						register={register}
						startAdornment={<BiMessage />}
					/>
					<Input
						type='text'
						name='phoneNumber'
						label='Phone number:'
						register={register}
						startAdornment={<BiPhone />}
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