'use client';


import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { SubmitButton } from './buttons.component';
import { SignInResponseError, UserCredentials } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { LOGIN_SCHEMA } from '@/constants/validation-schemas';
import PasswordInput from './password-input';
import Link from 'next/link';
import { StatusCodes } from 'http-status-codes';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import { useSubmitButton } from '@/hooks';


export default function LoginForm() {

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UserCredentials>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(LOGIN_SCHEMA) as any
	});

	const {
		spinner: { runSpinner, setRunSpinner },
		button: { disable, setDisable }
	} = useSubmitButton();

	const { push } = useRouter();

	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();

	const loginUser: SubmitHandler<UserCredentials> = async (credentials) => {
		setRunSpinner(true);
		setDisable(true);
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
				push('/dashboard');
			})
			.catch(error => {
				alert.show('danger', error.message);
			})
			.finally(() => {
				setRunSpinner(false);
				setDisable(false);
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
				</main>
				<footer>
					<SubmitButton
						disable={disable}
						runSpinner={runSpinner}
						content='login'
						spinnerText='Autenticando...'
					/>
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '0.6rem'
					}}>
						<span>
							Novo no ContactsPro? <Link href='/signup'>Crie sua conta aqui.</Link>
						</span>
						<span>
							Esqueceu sua senha? <Link href='/signup/recover'>Click aqui.</Link>
						</span>
					</div>
				</footer>
			</form>
		</Centralize>
	);
}