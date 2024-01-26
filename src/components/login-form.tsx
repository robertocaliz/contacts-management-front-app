'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { SignInError, UserCredentials } from '@/types';
import PasswordInput from './password-input';
import { StatusCodes } from 'http-status-codes';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import SubmitButton from './buttons/submit';
import SignUpButton from './buttons/signup';
import SignupRecoverButton from './buttons/signup-recover';
import Form from './form';
import { displayMessages } from '@/functions/form';

export default function LoginForm() {
	const {
		register,
		formState: { errors },
		getValues,
		setError,
		clearErrors,
	} = useForm<UserCredentials>();

	const router = useRouter();

	const { alertType, alertMessage, showAlert, alert } = useAlert();

	const loginUser = async () => {
		clearErrors();
		const credentials = getValues();
		await signIn('credentials', {
			...credentials,
			redirect: false,
		}).then((response) => {
			if (response?.error) {
				const error = JSON.parse(response?.error as string) as SignInError;
				if (error.status === StatusCodes.BAD_REQUEST) {
					displayMessages(JSON.parse(error.message), setError);
					return;
				}
				if (
					error.status === StatusCodes.FORBIDDEN ||
					StatusCodes.UNAUTHORIZED
				) {
					alert.show('warning', error.message);
					return;
				}
				return Promise.reject(error);
			}
			router.replace('/');
		});
	};

	return (
		<Centralize>
			<Alert variant={alertType} show={showAlert}>
				{alertMessage}
			</Alert>
			<Form action={loginUser}>
				<header>
					<FormHeader text='Login' />
				</header>
				<main>
					<Input
						label='Email'
						{...register('email')}
						errMessage={errors.email?.message}
					/>
					<PasswordInput
						label='Senha'
						{...register('password')}
						errMessage={errors.password?.message}
					/>
					<SubmitButton content='login' spinnerText='Autenticando...' />
				</main>
				<footer className='flex flex-col gap-2 text-center'>
					<span>
						Novo no ContactsPro? <SignUpButton text='Crie sua conta aqui.' />
					</span>
					<span>
						Esqueceu sua senha? <SignupRecoverButton text='Clique aqui.' />
					</span>
				</footer>
			</Form>
		</Centralize>
	);
}
