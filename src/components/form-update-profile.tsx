/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { User } from '@/types';
import FormHeader from './form-header';
import Input from './input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Alerts from '@/lib/alerts';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import { objChanged } from '@/functions/object';
import { updateSession } from '@/functions/session';
import Centralize from './centralize';
import SubmitButton from './buttons/submit';
import { update } from '@/app/actions/users';
import { displayErrors } from '@/functions/form-errors';
import SignupRecoverButton from './buttons/signup-recover';


type FormUpdateUserProps = {
	userData: Record<string, any>;
};

export default function FormUpdateProfile({ userData }: FormUpdateUserProps) {

	const [_userData, _setUserData] = useState<Record<string, any>>({});
	
	const {
		alertType,
		alertMessage,
		showAlert,
		alert
	} = useAlert();

	const {
		register,
		reset,
		formState: { errors },
		getValues,
		clearErrors,
		setError
	} = useForm<User>();


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


	const updateUserData = async () => {
		clearErrors();
		const newUserData = getValues();
		if (!profileChanged(newUserData)) {
			return alert.show('warning',
				'O perfíl não foi alterado.');
		}
		const { errors } = await update(newUserData, _userData._id);
		if (errors) {
			displayErrors(errors, setError);
			return;
		}
		await updateSession(newUserData);
		Alerts.success('Perfíl actualizado.');
		_setUserData(newUserData);
	};


	return (
		<Centralize>
			<Alert
				variant={alertType}
				show={showAlert}
			>
				{alertMessage}
			</Alert>
			<form action={updateUserData}>
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
						spinnerText='Actualizando...'
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
		</Centralize>
	);

}