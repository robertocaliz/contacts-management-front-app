'use client';


import Centralize from './centralize';
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import PasswordInput from './password-input';
import FormHeader from './form-header';
import { StatusCodes } from 'http-status-codes';
import { useParams, useRouter } from 'next/navigation';
import SubmitButton from './buttons/submit';
import { _changePassword } from '@/app/actions/users';
import { displayErrors } from '@/functions/form-errors';


type FormData = {
	password: string;
	confirmPassword: string;
};


export default function FormChangePassword() {

	const router = useRouter();
	const params = useParams();

	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();

	const {
		formState: { errors },
		reset,
		register,
		getValues,
		setError,
		clearErrors
	} = useForm<FormData>();


	const changePassword = async () => {
		clearErrors();
		const { errors, status } = await _changePassword({
			recoveryToken: params.recoveryToken as string,
			dada: getValues()
		});
		if (errors) {
			displayErrors(errors, setError);
			return;
		}
		if (status === StatusCodes.BAD_REQUEST) {
			alert.show('warning',
				`Token de recuperação expirado ou inválido. 
						Clique no link "Clique aqui" da página de login, 
						para obter um novo token de recuperação.`);
			return;
		}
		reset();
		router.push('/signup/recover/success');
	};

	return (
		<Centralize>
			<Alert variant={alertType} show={showAlert}>{alertMessage}</Alert>
			<form action={changePassword}>
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
					spinnerText='Alterando...'
				/>
			</form>
		</Centralize>
	);

}