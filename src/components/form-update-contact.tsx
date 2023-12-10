'use client';


import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Alerts from '@/lib/alerts';
import { useRouter } from 'next/navigation';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import { objChanged } from '@/functions/object';
import { update } from '@/app/actions/contact';
import { displayErrors } from '@/functions/form';
import { Contact } from '@/types';
import SubmitButton from './buttons/submit';
import BackButton from './buttons/back';
import Form from './form';


export default function FormUpdateContact({ contact }: { contact: Contact }) {

	const { back } = useRouter();

	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();

	const {
		register,
		reset,
		formState: { errors },
		getValues,
		setError,
		clearErrors
	} = useForm<Contact>();

	useEffect(() => {
		reset(contact);
	}, [contact]);

	const contactChnaged = (newContact: Contact) => {
		return objChanged({
			newObj: newContact,
			originalObj: contact
		});
	};

	const updateContact = async () => {
		clearErrors();
		const newContact = getValues();
		if (!contactChnaged(newContact)) {
			alert.show('warning',
				'O contacto não foi alterado.');
			return;
		}
		const { errors } = await update(newContact, contact._id);
		if (errors) {
			displayErrors(errors, setError);
			return;
		}
		reset();
		back();
		Alerts.success('Contacto actualizado.');
	};

	return (
		<Centralize>
			<Alert
				variant={alertType}
				show={showAlert}>
				{alertMessage}
			</Alert>
			<Form action={updateContact}>
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
					content='Actualizar contacto'
					spinnerText='Actualizando...'
				/>
			</Form>
			<BackButton />
		</Centralize>
	);
}