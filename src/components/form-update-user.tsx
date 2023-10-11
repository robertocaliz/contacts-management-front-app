import { User } from '@/types';
import FormHeader from './form-header';
import Input from './input';
import { SubmitButton } from './buttons.component';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';


export default function FormUpdateUser({ user }: { user: User }) {
	const [runSpinner, setRunSpinner] = useState(false);
	const [disableButton, setDisableButton] = useState(false);

	const {
		register,
		handleSubmit,
		reset
	} = useForm<User>();


	useEffect(() => {
		if (user) reset(user);
	}, [reset, user]);


	const onSubmit: SubmitHandler<User> = (user) => {
		console.log(user);
		console.log('Submitting user...');
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormHeader text='Update user' />
			<Input
				type='text'
				label='Name:'
				name='name'
				register={register}
			/>
			<Input
				type='email'
				label='Email:'
				name='email'
				register={register}
			/>
			<Input
				type='date'
				label='Birthday:'
			/>
			<SubmitButton
				runSpinner={runSpinner}
				spinnerText='Updating user...'
				disable={disableButton}
				content='Update user'
			/>
		</form>
	)

}