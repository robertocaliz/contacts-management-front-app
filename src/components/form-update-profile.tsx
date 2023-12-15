
'use client';

import { User } from '@/types';
import FormHeader from './form-header';
import Input from './input';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import useAlert from '@/hooks/use.alert';
import { objChanged } from '@/functions/object';
import Centralize from './centralize';
import SubmitButton from './buttons/submit';
import { update as updateProfile } from '@/app/actions/users';
import { displayErrors } from '@/functions/form';
import SignupRecoverButton from './buttons/signup-recover';
import Form from './form';
import { useUpdateSessionUser } from '@/hooks';



export default function FormUpdateProfile() {

	const [userData, setUserData] = useState<Partial<User>>({});

	const {
		session,
		updateSessionUser
	} = useUpdateSessionUser();


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
	} = useForm<Partial<User>>();


	useEffect(() => {
		reset(session?.user);
		setUserData(session?.user as Partial<User>);
	}, [session]);


	const profileChanged = (newUserData: Partial<User>) => {
		return objChanged({
			originalObj: userData,
			newObj: newUserData
		});
	};

	const handleUpdateProfile = async () => {
		
		clearErrors();
		
		let newUserData = getValues();
		
		if (!profileChanged(newUserData)) {
			return alert.show(
				'warning',
				'O perfíl não foi alterado.'
			);
		}
		
		newUserData = (newUserData.email === userData.email) ?
			(
				{ name: newUserData.name }
			) : (
				newUserData
			);

		const { errors, emailSend } = await updateProfile(newUserData, String(userData._id));

		if (errors) {
			displayErrors(errors, setError);
			return;
		}

		await updateSessionUser({ name: newUserData.name });

		if (emailSend) {
			return alert.show(
				'warning',
				`Clique no link que enviamos, 
				para confirmar a alteração do seu email.`
			);
		}

		alert.show(
			'success',
			'Perfíl actualizado!'
		);

	};


	return (
		<Centralize>
			<Alert
				variant={alertType}
				show={showAlert}>
				{alertMessage}
			</Alert>
			<Form action={handleUpdateProfile}>
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
			</Form>
		</Centralize>
	);

}