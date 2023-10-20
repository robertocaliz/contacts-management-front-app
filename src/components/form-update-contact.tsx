'use client';


import { Contact } from '@/types';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StatusCodes } from 'http-status-codes';
import Alerts from '@/lib/alerts';
import Spinner from './spinner';
import { useRouter } from 'next/navigation';
import Centralize from './centralize';
import { ButtonBack, SubmitButton } from './buttons.component';
import FormHeader from './form-header';
import Input from './input';
import { useContact } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_CONTACT_SCHEMA } from '@/constants/validation-schemas';


export default function FormUpdateContact({ contactId }: { contactId: number }) {

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<Contact>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(UPDATE_CONTACT_SCHEMA) as any
	});


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


	if (isLoading) return <Spinner loading={isLoading} text='Loading contact...' />;

	if (error) return <h1>Error!</h1>;


	const updateContact: SubmitHandler<Contact> = (contact) => {
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
				return (res.status === StatusCodes.OK) ?
					res.json() :
					Promise.reject();
			})
			.then(resBody => {
				reset();
				back();
				Alerts.success(resBody.message);
			})
			.catch(() => {
				Alerts.error('Error loading contact');
			})
			.finally(() => {
				setRunSpinner(false);
				setDisable(false);
			});
	};

	return (
		<>
			<Centralize>
				<ButtonBack />
				<form onSubmit={handleSubmit(updateContact)}>
					<FormHeader text={'Actualizar'} />
					<Input
						type='text'
						name='name'
						label='Nome:'
						register={register}
						error={errors.name?.message}
					/>
					<Input
						type='email'
						name='email'
						label='Email:'
						register={register}
						error={errors.email?.message}
					/>
					<Input
						type='text'
						name='phoneNumber'
						label='Phone number:'
						register={register}
						error={errors.phoneNumber?.message}
						startAdornment={'+258'}
					/>
					<SubmitButton
						disable={disable}
						runSpinner={runSpinner}
						content='Actualizar contacto'
						spinnerText='Actualizando...'
					/>
				</form>
				<hr />
			</Centralize>
		</>
	);
}