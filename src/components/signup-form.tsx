/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import Link from 'next/link';
import { User } from '@/types';
import PasswordInput from './password-input';
import { create } from '@/app/actions/users';
import { displayErrors } from '@/functions/form-errors';
import { useState } from 'react';
import SubmitButton from './buttons/submit';
import LoginButton from './buttons/login';
import Form from './form';


type AccountData = {
	confirmPassword?: string
} & User;


export default function SignUpForm() {

	const [disable, setDisable] = useState(true);

	const {
		register,
		reset,
		setError,
		formState: { errors },
		getValues,
		clearErrors
	} = useForm<AccountData>();


	const createAccount = async () => {
		clearErrors();
		const accountData = getValues();
		const { errors } = await create(accountData);
		if (errors) {
			displayErrors(errors, setError);
			return;
		}
		reset();
		redirect(`/signup/confirm/${accountData.email}`);
	};


	return (
		<Centralize>
			<Form action={createAccount}>
				<FormHeader text='Cadastro' />
				<main>
					<Input
						type='text'
						label='Nome'
						name='name'
						register={register}
						error={errors.name?.message}
					/>
					<Input
						type='text'
						label='Email'
						name='email'
						register={register}
						error={errors.email?.message}
					/>
					<PasswordInput
						label='Senha'
						name='password'
						register={register}
						error={errors.password?.message}
					/>
					<PasswordInput
						label='Confirmar senha'
						name='confirmPassword'
						register={register}
						error={errors.confirmPassword?.message}
					/>
				</main>
				<footer>
					<div>
						<input
							type='checkbox'
							onChange={() => setDisable(!disable)}
						/>
						<span> Li e estou de acordo com os <Link href='/terms-of-use'>Termos de uso.</Link></span>
					</div>
					<SubmitButton
						content='Crirar conta'
						spinnerText='Criando a conta...'
						disabled={disable}
					/>
					<div style={{ textAlign: 'center' }}>
						<span>Já passue uma conta? <LoginButton text='Click aqui para acessar.' /> </span>
					</div>
				</footer>
			</Form>
		</Centralize>
	);
}