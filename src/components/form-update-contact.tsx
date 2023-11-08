'use client';


import { ConflictErrorT, Contact } from '@/types';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Alerts from '@/lib/alerts';
import Spinner from './spinner';
import { useRouter } from 'next/navigation';
import Centralize from './centralize';
import { ButtonBack, SubmitButton } from './buttons.component';
import FormHeader from './form-header';
import Input from './input';
import { useContact, useSubmitButton } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_CONTACT_SCHEMA } from '@/constants/validation-schemas';
import { ContactsProvider } from '@/lib/providers/contacts';
import { StatusCodes } from 'http-status-codes';
import { displayConflictErrors } from '@/functions/form-errors';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';


export default function FormUpdateContact({ contactId }: { contactId: string }) {

	const { back } = useRouter();

	const {
		buttonState: { disable, runSpinner },
		submitButton
	} = useSubmitButton();


	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();


	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setError
	} = useForm<Contact>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(UPDATE_CONTACT_SCHEMA) as any
	});

	const {
		contact,
		error,
		isLoading
	} = useContact(contactId);


	useEffect(() => {
		reset(contact);
	}, [contact]);


	if (isLoading) {
		return <Spinner loading={isLoading} text='Carregando contacto...' />;
	}


	if (error) {
		return <Alert variant='danger' show={true}>{GLOBAL_ERROR_MESSAGE}</Alert>;
	}


	const updateContact: SubmitHandler<Contact> = async (contact) => {
		submitButton.runSpinner();
		submitButton.disable();
		await ContactsProvider
			.update(contact, contactId)
			.then(({ status, errors }) => {
				if (status === StatusCodes.CONFLICT) {
					displayConflictErrors(errors as Array<ConflictErrorT>, setError);
					return;
				}
				reset();
				back();
				Alerts.success('Contacto actualizado.');
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
		<>
			<Centralize>
				<Alert variant={alertType} show={showAlert}>{alertMessage}</Alert>
				<form onSubmit={handleSubmit(updateContact)}>
					<FormHeader text={'Actualizar'} />
					<Input
						type='text'
						name='name'
						label='Nome'
						register={register}
						error={errors.name?.message}
					/>
					<Input
						type='text'
						name='email'
						label='Email'
						register={register}
						error={errors.email?.message}
					/>
					<Input
						type='text'
						name='phoneNumber'
						label='Phone number'
						register={register}
						error={errors.phoneNumber?.message}
						maxLength={9}
					/>
					<SubmitButton
						disable={disable}
						runSpinner={runSpinner}
						content='Actualizar contacto'
						spinnerText='Actualizando...'
					/>
					<ButtonBack />
				</form>
			</Centralize>
		</>
	);
}