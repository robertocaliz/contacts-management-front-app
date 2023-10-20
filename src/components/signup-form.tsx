'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { SubmitButton } from './buttons.component';
import Link from 'next/link';
import { StatusCodes } from 'http-status-codes';
import Alerts from '@/lib/alerts';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@/types';
import { SIGNUP_SCHEMA } from '@/constants/validation-schemas';


type AccountData = {
	confirmPassword?: string
} & User;


export default function SignUpForm() {

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<AccountData>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(SIGNUP_SCHEMA) as any
	});


	const [runSpinner, setRunSpinner] = useState(false);
	const [disable, setDisable] = useState(true);
	const { push } = useRouter();

	const createAccount: SubmitHandler<AccountData> = (AccountData) => {

		delete AccountData['confirmPassword'];

		setRunSpinner(true);
		setDisable(true);

		fetch('/api/users',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(AccountData)
			})
			.then(async res => {
				const resBody = await res.json();
				return (res.status === StatusCodes.CREATED) ?
					resBody :
					Promise.reject(resBody);
			})
			.then(() => {
				reset();
				Alerts.success('Conta criada com sucesso.');
				push('/login');
			})
			.catch(() => {
				Alerts.error('Um erro ocorreu ao tentar criar a conta.');
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
					/>
					<Input
						type='password'
						label='Senha:'
						name='password'
						register={register}
						error={errors.password?.message}
					/>
					<Input
						type='password'
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