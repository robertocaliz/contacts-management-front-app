/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ConflictErrorT, User } from '@/types';
import { SIGNUP_SCHEMA } from '@/constants/validation-schemas';
import { UsersProvider } from '@/lib/providers/users';
import PasswordInput from './password-input';
import { isValidEmail } from '@/functions/is-email';
import { StatusCodes } from 'http-status-codes';
import { cleanConflictError, displayConflictErrors } from '@/functions/form-errors';


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

		resolver: yupResolver(SIGNUP_SCHEMA) as any
	});


	const [runSpinner, setRunSpinner] = useState(false);
	const [disable, setDisable] = useState(true);
	const { push } = useRouter();



	const checkIfEmailExists = async (e: any) => {
		e.preventDefault();
		const email = e.target.value;
		if (email && isValidEmail(email)) {
			await UsersProvider
				.checkIfEmailExists(email)
				.then(({ status, errors }) => {
					if (status === StatusCodes.CONFLICT) {
						displayConflictErrors(errors as Array<ConflictErrorT>, setError);
						return;
					}
					cleanConflictError<AccountData>('email', setError);
				})
				.catch(() => {
					Alerts.error('Ocorreu um erro.');
				});
		}
	};


	const createAccount: SubmitHandler<AccountData> = async (accountData) => {
		setRunSpinner(true);
		setDisable(true);
		await UsersProvider
			.create(accountData)
			.then(({ status, errors }) => {
				if (status === StatusCodes.CONFLICT) {
					displayConflictErrors(errors as Array<ConflictErrorT>, setError);
					return;
				}
				reset();
				// Alerts.success('Conta criada com sucesso.');
				push(`/signup/confirm/${accountData.email}`);
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