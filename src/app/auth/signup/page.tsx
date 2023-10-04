'use client';

import signupFormStyles from '@/../styles/auth/form.module.css';
import User from '@/types/user';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';




export default function SignUpPage() {

	const { register, handleSubmit, reset } = useForm<User>();
	const [disabled, setDisabled] = useState(true);

	const onSubmit: SubmitHandler<User> = (user) => {

		console.log(user);

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
				<footer>
					<section>
						<input
							type="checkbox"
							onChange={() => setDisabled(!disabled)}
						/>
						<span> I have read and agree to the <Link href='/'>Terms of Use.</Link></span>
					</section>
					<button
						type="submit"
						disabled={disabled}
						style={disabled ? { opacity: 0.5 } : { opacity: 1 }}
					>
						Create account
					</button>
				</footer>
			</header>
		</form>
	)
}