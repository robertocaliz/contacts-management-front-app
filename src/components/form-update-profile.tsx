/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { User } from '@/types';
import FormHeader from './form-header';
import Input from './input';
import { SignupRecoverButton, SubmitButton } from './buttons.component';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_USER_SCHEMA } from '@/constants/validation-schemas';
import Alerts from '@/lib/alerts';
import { UsersProvider } from '@/lib/providers/users';
import { updateSession } from '@/functions/update-session';
import { useSubmitButton } from '@/hooks';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import { GLOBAL_ERROR_MESSAGE } from '@/constants';
import { objChanged } from '@/functions/object';


type FormUpdateUserProps = {
	userData: Record<string, any>;
};


export default function FormUpdateProfile({ userData }: FormUpdateUserProps) {

	const [_userData, _setUserData] = useState<Record<string, any>>({});

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
		resolver: yupResolver(UPDATE_USER_SCHEMA) as any
	});

	useEffect(() => {
		reset(userData);
		_setUserData(userData);
	}, [userData]);


	const profileChanged = (newUserData: Record<string, any>) => {
		return objChanged({
			originalObj: _userData,
			newObj: newUserData
		});
	};


	const updateUserData: SubmitHandler<User> = async (newUserData) => {
		if (!profileChanged(newUserData)) {
			return alert.show('warning',
				'O perfíl não foi alterado.');
		}
		submitButton.runSpinner();
		submitButton.disable();
		await UsersProvider
			.update(newUserData, userData._id)
			.then(async () => {
				await updateSession(newUserData);
				Alerts.success('Perfíl actualizado.');
			})
			.catch(() => {
				alert.show('danger',
					GLOBAL_ERROR_MESSAGE);
			})
			.finally(() => {
				submitButton.interruptSpinner();
				submitButton.enable();
				_setUserData(newUserData);
			});
	};


	return (
		<>
			<Alert variant={alertType} show={showAlert} >{alertMessage}</Alert>
			<form onSubmit={handleSubmit(updateUserData)}>
				<FormHeader text='Actualizar Perfíl' />
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
					<SubmitButton
						runSpinner={runSpinner}
						spinnerText='Actualizando...'
						disable={disable}
						content='Actualizar'
					/>
				</main>
				<footer style={{ marginTop: '1.3rem' }}>
					<h6>Senha</h6>
					<SignupRecoverButton
						text='Clique aqui para recuperar ou alterar a senha.'
					/>
				</footer>
			</form>
		</>
	);

}