
'use client';


import { useSubmitButton } from '@/hooks';
import { ButtonBack, SubmitButton } from './buttons.component';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { EMAIL_SCHEMA } from '@/constants/validation-schemas';
import { UsersProvider } from '@/lib/providers/users';
import useAlert from '@/hooks/use.alert';
import Alert from 'react-bootstrap/Alert';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';


type ObjEmail = Pick<User, 'email'>;



export default function FormRecoverSignup() {

	const router = useRouter();

	const {
		buttonState: { disable, runSpinner },
		submitButton
	} = useSubmitButton();

	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();

	const {
		reset,
		register,
		formState: { errors },
		handleSubmit,
		setError
	} = useForm<ObjEmail>({
		resolver: yupResolver(EMAIL_SCHEMA)
	});

	const checkIfEmailExists: SubmitHandler<ObjEmail> = async (objEmail) => {
		submitButton.runSpinner();
		submitButton.disable();
		await UsersProvider
			._checkIfEmailExists(objEmail.email)
			.then(({ status, resBody }) => {
				if (status === StatusCodes.NOT_FOUND) {
					setError('email', {
						message: 'O email não foi encontrado no sistema.'
					});
					return;
				}
				if ((status === StatusCodes.OK) && (resBody?.emailSend)) {
					router.push('/signup/recover/confirm');
					reset();
					return;
				}
				return Promise.reject();
			})
			.catch(() => {
				alert.show('danger',
					GLOBAL_ERROR_MESSAGE);
			})
			.finally(() => {
				submitButton.interruptSpinner();
				submitButton.enable();
			});
	};

	return (
		<Centralize>
			<Alert variant={alertType} show={showAlert}>{alertMessage}</Alert>
			<form onSubmit={handleSubmit(checkIfEmailExists)}>
				<FormHeader text='Recuperação de senha' />
				<Input
					type='text'
					label='Digite seu e-mail'
					name='email'
					register={register}
					error={errors.email?.message}
				/>
				<SubmitButton
					content='Recuperar'
					spinnerText='Recuperando...'
					runSpinner={runSpinner}
					disable={disable}
				/>
				<ButtonBack />
			</form>
		</Centralize>
	);

}