'use client';

import { useSubmitButton } from '@/hooks';
import { SubmitButton } from './buttons.component';
import Centralize from './centralize';
import { SubmitHandler, useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import PasswordInput from './password-input';
import FormHeader from './form-header';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_PASSWORD_SCHEMA } from '@/constants/validation-schemas';
import { UsersProvider } from '@/lib/providers/users';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';


type FormData = {
	password: string;
	confirmPassword: string;
};


export default function FormChangePassword({ recoveryToken }: { recoveryToken: string }) {

	const {
		buttonState: { disable, runSpinner },
		submitButton
	} = useSubmitButton();

	const router = useRouter();

	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();

	const {
		handleSubmit,
		formState: { errors },
		reset,
		register
	} = useForm<FormData>({
		resolver: yupResolver(UPDATE_PASSWORD_SCHEMA)
	});


	const changePassword: SubmitHandler<FormData> = async (data) => {
		submitButton.runSpinner();
		submitButton.disable();
		await UsersProvider
			.changePassword({
				newPassword: data.password,
				recoveryToken
			})
			.then(status => {
				if (status === StatusCodes.OK) {
					reset();
					router.push('/signup/recover/success');
					return;
				}
				if (status === StatusCodes.BAD_REQUEST) {
					alert.show('warning',
						`Token de recuperação expirado ou inválido. 
						Clique no link "Clique aqui" da página de login, 
						para obter um novo token de recuperação.`);
					return;
				}
				return Promise.reject();
			})
			.catch(() => {
				alert.show('danger',
					GLOBAL_ERROR_MESSAGE);
			})
			.finally(() => {
				submitButton.enable();
				submitButton.interruptSpinner();
			});
	};

	return (
		<Centralize>
			<Alert variant={alertType} show={showAlert}>{alertMessage}</Alert>
			<form onSubmit={handleSubmit(changePassword)}>
				<FormHeader text='Defina uma nova senha' />
				<PasswordInput
					type="password"
					label="Senha"
					name='password'
					register={register}
					error={errors.password?.message}
				/>
				<PasswordInput
					type='password'
					label='Repita a senha'
					register={register}
					name='confirmPassword'
					error={errors.confirmPassword?.message}
				/>
				<SubmitButton
					content='Alterar senha'
					runSpinner={runSpinner}
					disable={disable}
					spinnerText='Alterando...'
				/>
			</form>
		</Centralize>
	);

}