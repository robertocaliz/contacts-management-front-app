'use client';


import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { Error, SignInError, UserCredentials } from '@/types';
import PasswordInput from './password-input';
import { StatusCodes } from 'http-status-codes';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import SubmitButton from './buttons/submit-button';
import SignUpButton from './buttons/signup';
import SignupRecoverButton from './buttons/signup-recover';
import { displayErrors } from '@/functions/form-errors';


export default function LoginForm() {

	const {
		register,
		formState: { errors },
		getValues,
		setError,
		clearErrors
	} = useForm<UserCredentials>();

	const { replace } = useRouter();

	const {
		alertType,
		alertMessage,
		showAlert,
		alert,
	} = useAlert();
	

	const loginUser = async () => {
		clearErrors();
		const credentials = getValues();
		await signIn('credentials',
			{
				...credentials,
				redirect: false,
			})
			.then(response => {
				if (response?.error) {
					const error = JSON.parse(response?.error as string) as SignInError;
					if (error.status === StatusCodes.BAD_REQUEST) {
						displayErrors(JSON.parse(error.message) as Error[], setError);
						return;
					}
					if (error.status === StatusCodes.FORBIDDEN) {
						alert.show('warning', error.message);
						return;
					}
					return Promise.reject(error);
				}
				replace('/');
			});
	};

	return (
		<Centralize>
			<Alert
				variant={alertType}
				show={showAlert}>
				{alertMessage}
			</Alert>
			<form action={loginUser}>
				<FormHeader text='Login' />
				<main>
					<Input
						type='email'
						label='Email'
						name="email"
						register={register}
						error={errors.email?.message}
					/>
					<PasswordInput
						label='Senha'
						name='password'
						register={register}
						error={errors.password?.message}
					/>
					<SubmitButton
						content='login'
						spinnerText='Autenticando...'
					/>
				</main>
				<footer>
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '0.6rem'
					}}>
						<span>
							Novo no ContactsPro? <SignUpButton text='Crie sua conta aqui.' />
						</span>
						<span>
							Esqueceu sua senha? <SignupRecoverButton text='Clique aqui.' />
						</span>
					</div>
				</footer>
			</form>
		</Centralize>
	);
}