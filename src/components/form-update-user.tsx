import { User } from '@/types';
import FormHeader from './form-header';
import Input from './input';
import { SubmitButton } from './buttons.component';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_USER_SCHEMA } from '@/constants/validation-schemas';
import Alerts from '@/lib/alerts';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UsersProvider } from '@/lib/providers/users';


export default function FormUpdateUser({ userData }: { userData: User }) {
	const { push } = useRouter();
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


	const updateUserData: SubmitHandler<User> = async (user) => {
		setRunSpinner(true);
		setDisableButton(true);
		delete user.accessToken;
		delete user.refreshToken;
		await UsersProvider
			.update(user, userData.id)
			.then(() => {
				Alerts.success('Dados actualizados.');
				signOut({ redirect: false })
					.then(() => push('/login'));
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