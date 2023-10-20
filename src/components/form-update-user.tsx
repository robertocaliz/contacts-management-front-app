import { User } from '@/types';
import FormHeader from './form-header';
import Input from './input';
import { SubmitButton } from './buttons.component';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { UPDATE_USER_SCHEMA } from '@/constants/validation-schemas';
import { StatusCodes } from 'http-status-codes';
import Alerts from '@/lib/alerts';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function FormUpdateUser({ user$ }: { user$: User }) {
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
		if (user$) reset(user$);
	}, [reset, user$]);


	const updateUserData: SubmitHandler<User> = (user) => {
		setRunSpinner(true);
		setDisableButton(true);
		fetch(`/api/users/${user$.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			})
			.then(res => {
				return (res.status === StatusCodes.OK) ?
					res.json() :
					Promise.resolve();
			})
			.then(resBody => {
				Alerts.success(resBody.message);
				signOut({ redirect: false })
					.then(() => push('/login'));
			})
			.catch(error => {
				Alerts.error(error.message);
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
				spinnerText='Updating user...'
				disable={disableButton}
				content='Actualizar usuário'
			/>
		</form>
	);

}