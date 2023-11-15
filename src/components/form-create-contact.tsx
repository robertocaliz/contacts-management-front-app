'use client';

import Alerts from '@/lib/alerts';
import { ConflictErrorT, Contact } from '@/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import Centralize from './centralize';
import { ButtonBack, SubmitButton } from './buttons.component';
import FormHeader from './form-header';
import Input from './input';
import { yupResolver } from '@hookform/resolvers/yup';
import { CREATE_CONTACT_SCHEMA } from '@/constants/validation-schemas';
import { ContactsProvider } from '@/lib/providers/contacts';
import { StatusCodes } from 'http-status-codes';
import { displayConflictErrors } from '@/functions/form-errors';
import { useSubmitButton } from '@/hooks';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';


export default function FormAddContact() {


	const {
		buttonState: { disable, runSpinner },
		submitButton
	} = useSubmitButton();


	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setError
	} = useForm<Contact>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(CREATE_CONTACT_SCHEMA) as any
	});


	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();


	const createContact: SubmitHandler<Contact> = async (contact) => {
		submitButton.runSpinner();
		submitButton.disable();
		await ContactsProvider
			.create(contact)
			.then(({ status, errors }) => {
				if (status === StatusCodes.CONFLICT) {
					displayConflictErrors(errors as Array<ConflictErrorT>, setError);
					return;
				}
				reset();
				Alerts.success('Contacto criado.');
			})
			.catch(() => {
				alert.show('danger', GLOBAL_ERROR_MESSAGE);
			})
			.finally(() => {
				submitButton.interruptSpinner();
				submitButton.enable();
			});
	};


	return (
		<Centralize>
			<Alert variant={alertType} show={showAlert}>{alertMessage}</Alert>
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
					maxLength={9}
					placeholder='+258'
				/>
				<SubmitButton
					disable={disable}
					runSpinner={runSpinner}
					content='Criar contacto'
					spinnerText='Criando...'
				/>
				<ButtonBack />
			</form>
		</Centralize>
	);
}