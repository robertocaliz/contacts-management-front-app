
'use client';

import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { findEmail } from '@/app/actions/users';
import { displayErrors } from '@/functions/form-errors';
import { StatusCodes } from 'http-status-codes';
import { useForm } from 'react-hook-form';
import SubmitButton from './buttons/submit';
import ButtonBack from './buttons/back-button';


export default function FormRecoverSignup() {

	const router = useRouter();

	const {
		reset,
		register,
		formState: { errors },
		setError,
		getValues,
		clearErrors
	} = useForm<Pick<User, 'email'>>();



	const checkIfEmailExists = async () => {
		clearErrors();
		const { errors, status } = await findEmail(getValues().email);
		if (errors) {
			displayErrors(errors, setError);
			return;
		}
		if (status === StatusCodes.NOT_FOUND) {
			setError('email', {
				message: 'O email não foi encontrado no sistema.'
			});
			return;
		}
		reset();
		router.push('/signup/recover/confirm');
	};

	return (
		<Centralize>
			<form action={checkIfEmailExists}>
				<FormHeader text='Recuperação de senha' />
				<Input
					type='text'
					label='Digite seu e-mail'
					name='email'
					register={register}
					error={errors.email?.message}
				/>
				<SubmitButton
					content='Recuperar'
					spinnerText='Recuperando...'
				/>
			</form>
			<ButtonBack />
		</Centralize>
	);

}