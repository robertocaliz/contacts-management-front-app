'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { SubmitButton } from './buttons.component';
import Link from 'next/link';
import Alerts from '@/lib/alerts';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@/types';
import { SIGNUP_SCHEMA } from '@/constants/validation-schemas';
import { UsersProvider } from '@/lib/providers/users';
import PasswordInput from './password-input';
import { isValidEmail } from '@/functions/is-email';
import { StatusCodes } from 'http-status-codes';


type AccountData = {
	confirmPassword?: string
} & User;


export default function SignUpForm() {

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors }
	} = useForm<AccountData>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(SIGNUP_SCHEMA) as any
	});


	const [runSpinner, setRunSpinner] = useState(false);
	const [disable, setDisable] = useState(true);
	const { push } = useRouter();



	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const checkIfEmailExists = async (e: any) => {
		e.preventDefault();
		const email = e.target.value;
		if (isValidEmail(email)) {
			await UsersProvider
				.checkIfEmailExists(email)
				.then(statusCode => {
					if (statusCode === StatusCodes.CONFLICT) {
						setError('email', {
							message: 'Email já existe.'
						});
						return;
					}
					setError('email', {
						message: ''
					});
				})
				.catch(() => {
					Alerts.error('Ocorreu um erro.');
				});
		}
	};


	const createAccount: SubmitHandler<AccountData> = async (AccountData) => {
		delete AccountData['confirmPassword'];
		setRunSpinner(true);
		setDisable(true);
		await UsersProvider
			.create(AccountData)
			.then(() => {
				reset();
				Alerts.success('Conta criada com sucesso.');
				push('/login');
			})
			.catch(() => {
				Alerts.error('Ocorreu um erro.');
			})
			.finally(() => {
				setRunSpinner(false);
				setDisable(false);
			});

	};


	return (
		<Centralize>
			<form onSubmit={handleSubmit(createAccount)}>
				<FormHeader text='Cadastro' />
				<main>
					<Input
						type='text'
						label='Nome:'
						name='name'
						register={register}
						error={errors.name?.message}
					/>
					<Input
						type='text'
						label='Email:'
						name='email'
						register={register}
						error={errors.email?.message}
						onBlur={checkIfEmailExists}
					/>
					<PasswordInput
						label='Senha:'
						name='password'
						register={register}
						error={errors.password?.message}
					/>
					<PasswordInput
						label='Confirmar senha:'
						name='confirmPassword'
						register={register}
						error={errors.confirmPassword?.message}
					/>
				</main>
				<footer>
					<section>
						<input
							type='checkbox'
							onChange={() => setDisable(!disable)}
						/>
						<span> Li e estou de acordo com os <Link href='/terms-of-use'>Termos de uso.</Link></span>
					</section>
					<SubmitButton
						runSpinner={runSpinner}
						disable={disable}
						content='Create account'
						spinnerText='Creating account...'
					/>
				</footer>
			</form>
			<hr />
		</Centralize>
	);
}