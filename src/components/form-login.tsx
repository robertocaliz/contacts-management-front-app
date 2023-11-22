'use client';


import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { SignInResponseError, UserCredentials } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { LOGIN_SCHEMA } from '@/constants/validation-schemas';
import PasswordInput from './password-input';
import { StatusCodes } from 'http-status-codes';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import SubmitButton from './buttons/submit-button';
import SignUpButton from './buttons/signup';
import SignupRecoverButton from './buttons/signup-recover';


export default function LoginForm() {

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UserCredentials>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(LOGIN_SCHEMA) as any
	});


	const { replace } = useRouter();

	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();

	const loginUser: SubmitHandler<UserCredentials> = async (credentials) => {
		await signIn('credentials',
			{
				...credentials,
				redirect: false,
			})
			.then(response => {
				if (response?.error) {
					const error = JSON.parse(response?.error as string) as SignInResponseError;
					if (error.status !== StatusCodes.INTERNAL_SERVER_ERROR) {
						alert.show('warning', error.message);
						return;
					}
					return Promise.reject(error);
				}
				replace('/');
			})
			.catch(error => {
				alert.show('danger', error.message);
			});
	};

	return (
		<Centralize>
			<Alert
				variant={alertType}
				show={showAlert}>
				{alertMessage}
			</Alert>
			<form onSubmit={handleSubmit(loginUser)}>
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