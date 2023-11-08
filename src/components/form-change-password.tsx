'use client';

import { useSubmitButton } from '@/hooks';
import { SubmitButton } from './buttons.component';
import Centralize from './centralize';
import { useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import PasswordInput from './password-input';
import FormHeader from './form-header';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_PASSWORD_SCHEMA } from '@/constants/validation-schemas';


export default function FormChangePassword({ recoveryToken }: { recoveryToken: string }) {

	const {
		spinner: { runSpinner, setRunSpinner },
		button: { disable, setDisable }
	} = useSubmitButton();


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
	} = useForm({
		resolver: yupResolver(UPDATE_PASSWORD_SCHEMA)
	});


	const chnagePassword = () => {
		console.log(recoveryToken);
	};

	return (
		<Centralize>
			<Alert variant={alertType} show={showAlert}>{alertMessage}</Alert>
			<form onSubmit={handleSubmit(chnagePassword)}>
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