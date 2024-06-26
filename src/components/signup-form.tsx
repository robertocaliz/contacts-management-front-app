'use client';

import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import Link from 'next/link';
import { User } from '@/types';
import PasswordInput from './password-input';
import { useState } from 'react';
import SubmitButton from './buttons/submit';
import LoginButton from './buttons/login';
import Form from './form';
import Div from './div';
import CheckBox from './check-box';
import { checkIfEmailExists, createAccount } from '@/app/actions/users';
import { displayMessages } from '@/functions/form';
import { StatusCodes } from 'http-status-codes';

type AccountData = {
	confirmPassword?: string;
} & User;

export default function SignUpForm() {
	const [disableSubmitButton, setDisableSubmitButton] = useState(true);

	const {
		register,
		reset,
		setError,
		formState: { errors },
		getValues,
		clearErrors,
	} = useForm<AccountData>();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const _checkIfEmailExists = async (e: any) => {
		const email = e.target.value;
		await checkIfEmailExists(email).then((status) => {
			if (!(status === StatusCodes.OK)) {
				setError('email', {
					message: 'Email já está em uso.',
				});
				return;
			}
			setError('email', {
				message: '',
			});
		});
	};

	const handleCreateAccount = async () => {
		clearErrors();
		const accountData = getValues();
		const { errors } = await createAccount(accountData);
		if (errors) {
			console.log(errors);
			displayMessages(errors, setError);
			return;
		}
		reset();
		redirect(`/signup/confirm/${accountData.email}`);
	};

	return (
		<Centralize>
			<Form action={handleCreateAccount}>
				<FormHeader text='Cadastro' />
				<main>
					<Input
						label='Nome'
						{...register('name')}
						errMessage={errors.name?.message}
					/>
					<Input
						label='Email'
						{...register('email')}
						errMessage={errors.email?.message}
						onBlur={_checkIfEmailExists}
					/>
					<PasswordInput
						label='Senha'
						{...register('password')}
						errMessage={errors.password?.message}
					/>
					<PasswordInput
						label='Confirmar senha'
						{...register('confirmPassword')}
						errMessage={errors.confirmPassword?.message}
					/>
				</main>
				<footer>
					<CheckBox
						label={
							<span>
								Li e estou de acordo com os{' '}
								<Link href='/terms-of-use'>Termos de uso.</Link>
							</span>
						}
						onChange={() =>
							setDisableSubmitButton(
								(disableSubmitButton) => !disableSubmitButton,
							)
						}
					/>
					<SubmitButton
						content='Criar conta'
						spinnerText='Criando a conta...'
						disabled={disableSubmitButton}
					/>
					<Div className='text-center'>
						<span>
							Já passue uma conta?{' '}
							<LoginButton text='Click aqui para acessar.' />{' '}
						</span>
					</Div>
				</footer>
			</Form>
		</Centralize>
	);
}
