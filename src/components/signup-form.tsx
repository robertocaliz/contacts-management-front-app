/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { SubmitButton } from './buttons.component';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { ConflictErrorT, User } from '@/types';
import { SIGNUP_SCHEMA } from '@/constants/validation-schemas';
import { UsersProvider } from '@/lib/providers/users';
import PasswordInput from './password-input';
import { isValidEmail } from '@/functions/is-email';
import { StatusCodes } from 'http-status-codes';
import { cleanConflictError, displayConflictErrors } from '@/functions/form-errors';
import useAlert from '@/hooks/use.alert';
import Alert from 'react-bootstrap/Alert';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';
import { useSubmitButton } from '@/hooks';


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


	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();


	const {
		buttonState: { disable, runSpinner },
		stateHandler: { setDisable },
		submitButton
	} = useSubmitButton({
		disable: true
	});


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
					alert.show('danger', GLOBAL_ERROR_MESSAGE);
				});
		}
	};


	const createAccount: SubmitHandler<AccountData> = async (accountData) => {
		submitButton.runSpinner();
		submitButton.disable();
		await UsersProvider
			.create(accountData)
			.then(({ status, errors, resBody }) => {
				if (status === StatusCodes.CONFLICT) {
					displayConflictErrors(errors as Array<ConflictErrorT>, setError);
					return;
				}
				if (status === StatusCodes.CREATED && resBody?.emailSend) {
					reset();
					push(`/signup/confirm/${accountData.email}`);
					return;
				}
				return Promise.reject();
			})
			.catch(() => {
				alert.show('danger', GLOBAL_ERROR_MESSAGE);
			})
			.finally(() => {
				submitButton.interruptSpinner();
				submitButton.enable();
			});
	};


	return (
		<Centralize>
			<Alert
				variant={alertType}
				show={showAlert}>
				{alertMessage}
			</Alert>
			<form onSubmit={handleSubmit(createAccount)}>
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
						onBlur={checkIfEmailExists}
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
						runSpinner={runSpinner}
						disable={disable}
						content='Crirar conta'
						spinnerText='Criando a conta...'
					/>
					<div style={{ textAlign: 'center' }}>
						<span>Já passue uma conta? <Link href='/login'>Click aqui para acessar.</Link> </span>
					</div>
				</footer>
			</form>
		</Centralize>
	);
}