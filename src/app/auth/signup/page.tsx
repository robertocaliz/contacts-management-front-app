'use client';

import signupFormStyles from '@/../styles/auth/form.module.css';
import User from '@/types/user';
import { SubmitHandler, useForm } from 'react-hook-form';




export default function SignUpPage() {

	const { register, handleSubmit, reset } = useForm<User>();

	const onSubmit: SubmitHandler<User> = (user) => {
		
		console.log(user)

		reset();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={signupFormStyles.form}>
			<header>
				<h1>Signup</h1>
				<div className='field'>
					<label htmlFor="name">Name: </label>
					<input
						{...register('name')}
						className={signupFormStyles.inputField}
						type="text"
						name="name"
						id="name"
					/>
				</div>

				<div className='field'>
					<label htmlFor="email">Email: </label>
					<input
						{...register('email')}
						className={signupFormStyles.inputField}
						type="text"
						name="email"
						id="email"
					/>
				</div>
				<div className='field'>
					<label htmlFor="password">Password: </label>
					<input
						{...register('password')}
						className={signupFormStyles.inputField}
						type="text"
						name="password"
						id="password"
					/>
				</div>
				<div className='field'>
					<label htmlFor="confirm-password">Confirm password: </label>
					<input
						className={signupFormStyles.inputField}
						type="text"
						name="confirmPassword"
						id="confirm-password" />
				</div>
				<button type="submit">Create account</button>
			</header>
		</form>
	)
}