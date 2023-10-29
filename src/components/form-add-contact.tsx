'use client';

import Alerts from '@/lib/alerts';
import { Contact } from '@/types';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Centralize from './centralize';
import { ButtonBack, SubmitButton } from './buttons.component';
import FormHeader from './form-header';
import Input from './input';
import { yupResolver } from '@hookform/resolvers/yup';
import { CREATE_CONTACT_SCHEMA } from '@/constants/validation-schemas';
import { ContactsProvider } from '@/lib/providers/contacts';


export default function FormAddContact() {


	const [runSpinner, setRunSpinner] = useState(false);
	const [disable, setDisable] = useState(false);


	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<Contact>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(CREATE_CONTACT_SCHEMA) as any
	});


	const createContact: SubmitHandler<Contact> = async (contact) => {
		setRunSpinner(true);
		setDisable(true);
		await ContactsProvider
			.create(contact)
			.then(() => {
				reset();
				Alerts.success('Contacto criado.');
			})
			.catch(() => {
				Alerts.error('Ocorreu um erro.');
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
				<form onSubmit={handleSubmit(createContact)}>
					<FormHeader text='Adicionar' />
					<Input
						type='text'
						name='name'
						label='Nome:'
						register={register}
						error={errors.name?.message}
					/>
					<Input
						type='text'
						name='email'
						label='Email:'
						register={register}
						error={errors.email?.message}
					/>
					<Input
						type='text'
						name='phoneNumber'
						label='Telefone/Telemóvel:'
						register={register}
						error={errors.phoneNumber?.message}
						startAdornment={'+258'}
						maxLength={9}
					/>
					<SubmitButton
						disable={disable}
						runSpinner={runSpinner}
						content='Criar contacto'
						spinnerText='Criando...'
					/>
				</form>
				<hr />
			</Centralize>
		</>
	);

}