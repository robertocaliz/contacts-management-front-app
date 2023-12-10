
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
import Centralize from './centralize';
import SubmitButton from './buttons/submit';
import { update as updateProfile } from '@/app/actions/users';
import { displayErrors } from '@/functions/form';
import SignupRecoverButton from './buttons/signup-recover';
import Form from './form';
import { useRouter } from 'next/navigation';
import { updateSession } from '@/functions/session';



type FormUpdateProfileProps = {
	data: Partial<User>;
};


export default function FormUpdateProfile({ data }: FormUpdateProfileProps) {

	
	const router = useRouter();
	const [userData, setUserData] = useState<Partial<User>>({});


	useEffect(() => {
		reset(data);
		setUserData(data);
	}, [data]);


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
			return alert.show('warning', 'O perfíl não foi alterado.');
		}

		newUserData = (newUserData.email === userData.email) ?
			({
				name: getValues().name
			}) : (
				newUserData
			);

		const errors = await updateProfile(newUserData, String(userData._id));
		if (errors) {
			displayErrors(errors, setError);
			return;
		}


		await updateSession(newUserData);
		router.refresh();
		Alerts.success('Perfíl actualizado.');
		setUserData(newUserData);


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