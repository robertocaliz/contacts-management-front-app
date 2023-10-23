import { User } from '@/types';
import FormHeader from './form-header';
import Input from './input';
import { SubmitButton } from './buttons.component';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_USER_SCHEMA } from '@/constants/validation-schemas';
import Alerts from '@/lib/alerts';
import { UsersProvider } from '@/lib/providers/users';
import { updateSession } from '@/functions/update-session';


export default function FormUpdateUser({
	userData,
	setUserData,
	setEditUserData
}: {
	userData: User,
	setUserData: Dispatch<SetStateAction<User | undefined>>,
	setEditUserData: Dispatch<SetStateAction<boolean>>
}) {

	const [runSpinner, setRunSpinner] = useState(false);
	const [disableButton, setDisableButton] = useState(false);

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
		if (userData) reset(userData);
	}, [reset, userData]);


	const updateUserData: SubmitHandler<User> = async (newUserData) => {
		setRunSpinner(true);
		setDisableButton(true);
		delete newUserData.accessToken;
		delete newUserData.refreshToken;
		await UsersProvider
			.update(newUserData, userData.id)
			.then(async () => {
				await updateSession(newUserData);
				setUserData(newUserData);
				setEditUserData(false);
				Alerts.success('Dados actualizados.');
			})
			.catch(() => {
				Alerts.error('Ocorreu um erro.');
			})
			.finally(() => {
				setRunSpinner(false);
				setDisableButton(false);
			});
	};


	return (
		<form onSubmit={handleSubmit(updateUserData)}>
			<FormHeader text='Actualizar' />
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
			<SubmitButton
				runSpinner={runSpinner}
				spinnerText='Actualizando...'
				disable={disableButton}
				content='Actualizar usuário'
			/>
		</form>
	);

}