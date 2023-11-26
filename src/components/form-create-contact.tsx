
'use client';

import Centralize from './centralize';
import { ButtonBack } from './buttons.component';
import FormHeader from './form-header';
import Input from './input';
import { useForm } from 'react-hook-form';
import { Contact } from '@/types';
import Alerts from '@/lib/alerts';
import { create } from '@/app/actions/contact';
import { displayErrors } from '@/functions/form-errors';
import wait from '@/lib/wait';
import SubmitButton from './buttons/submit';

export default function FormAddContact() {

	const {
		register,
		getValues,
		setError,
		reset,
		clearErrors,
		formState: { errors }
	} = useForm<Contact>();


	const createContact = async () => {

		await wait(2000);

		clearErrors();
		const { errors } = await create(getValues());
		if (errors) {
			displayErrors(errors, setError);
			return;
		}
		reset();
		Alerts.success('Contacto criado.');
	};


	return (
		<Centralize>
			<form action={createContact}>
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
					maxLength={9}
					placeholder='+258'
					register={register}
					error={errors.phoneNumber?.message}
				/>
				<SubmitButton
					content='Criar contacto'
					spinnerText='Criando...'
				/>
			</form>
			<ButtonBack />
		</Centralize>
	);
}