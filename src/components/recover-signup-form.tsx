
'use client';


import { useSubmitButton } from '@/hooks';
import { ButtonBack, SubmitButton } from './buttons.component';
import Centralize from './centralize';
import FormHeader from './form-header';
import Input from './input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { EMAIL_SCHEMA } from '@/constants/validation-schemas';



type ObjEmail = Pick<User, 'email'>;



export default function FormRecoverSignup() {

	const {
		spinner: { runSpinner, setRunSpinner },
		button: { disable, setDisable }
	} = useSubmitButton();



	const {
		reset,
		register,
		formState: { errors },
		handleSubmit
	} = useForm<ObjEmail>({
		resolver: yupResolver(EMAIL_SCHEMA)
	});



	const checkIfEmailExists: SubmitHandler<ObjEmail> = (objEmail) => {
		console.log(objEmail);
	};

	return (
		<Centralize>
			<form onSubmit={handleSubmit(checkIfEmailExists)}>
				<FormHeader text='Recuperação de senha' />
				<Input
					type='text'
					label='Digite seu e-mail'
					name='email'
					register={register}
					error={errors.email?.message}
				/>
				<SubmitButton
					content='Recuperar'
					spinnerText='Recuperando...'
					runSpinner={runSpinner}
					disable={disable}
				/>
				<ButtonBack />
			</form>
			<hr />
		</Centralize>
	);

}