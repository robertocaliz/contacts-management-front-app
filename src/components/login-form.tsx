'use client';

import Alerts from '@/lib/alerts';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { SubmitButton } from './buttons.component';
import { UserCredentials } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { LOGIN_SCHEMA } from '@/constants/validation-schemas';
import PasswordInput from './password-input';
import Link from 'next/link';


export default function LoginForm() {

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UserCredentials>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(LOGIN_SCHEMA) as any
	});

	const [runSpinner, setRunSpinner] = useState(false);
	const [disable, setDisable] = useState(false);
	const { push } = useRouter();

	const loginUser: SubmitHandler<UserCredentials> = async (credentials) => {
		setRunSpinner(true);
		setDisable(true);
		await signIn('credentials',
			{
				...credentials,
				redirect: false,
			})
			.then(response => {
				if (response?.error !== null) {
					return Promise.reject(response?.error);
				}
				push('/dashboard');
			})
			.catch(error => {
				Alerts.error(error);
			})
			.finally(() => {
				setRunSpinner(false);
				setDisable(false);
			});
	};

	return (
		<Centralize>
			<form onSubmit={handleSubmit(loginUser)}>
				<FormHeader text='Login' />
				<main>
					<Input
						type='email'
						label='Email:'
						name="email"
						register={register}
						error={errors.email?.message}
					/>
					<PasswordInput
						label='Senha:'
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
							Novo no ContactsPro? <Link href='/signup'>Cria sua conta aqui.</Link>
						</span>
						<span>
							Esqueceu sua senha? <Link href='#'>Click aqui.</Link>
						</span>
					</div>
				</footer>
			</form>
			<hr />
		</Centralize>
	);
}