import { User } from '@/types';
import FormHeader from './form-header';
import Input from './input';
import { SubmitButton } from './buttons.component';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_USER_SCHEMA } from '@/constants/validation-schemas';
import Alerts from '@/lib/alerts';
import { UsersProvider } from '@/lib/providers/users';
import { updateSession } from '@/functions/update-session';
import { useSubmitButton } from '@/hooks';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';


type FormUpdateUserProps = {
	userData: User;
	setUserData: Dispatch<SetStateAction<User | undefined>>;
	setShowUpdateUserForm: Dispatch<SetStateAction<boolean>>;
};

export default function FormUpdateUser({
	userData,
	setUserData,
	setShowUpdateUserForm
}: FormUpdateUserProps) {

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
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<User>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: yupResolver(UPDATE_USER_SCHEMA) as any
	});

	useEffect(() => {
		reset(userData);
	}, [userData]);

	const updateUserData: SubmitHandler<User> = async (newUserData) => {
		submitButton.runSpinner();
		submitButton.disable();
		await UsersProvider
			.update(newUserData, userData._id)
			.then(async () => {
				await updateSession(newUserData);
				setUserData(newUserData);
				reset();
				setShowUpdateUserForm(false);
				Alerts.success('Utilizador actualizado.');
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
		<>
			<Alert variant={alertType} show={showAlert} >{alertMessage}</Alert>
			<form onSubmit={handleSubmit(updateUserData)}>
				<FormHeader text='Actualizar' />
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
				<SubmitButton
					runSpinner={runSpinner}
					spinnerText='Actualizando...'
					disable={disable}
					content='Actualizar usuário'
				/>
			</form>
		</>
	);

}