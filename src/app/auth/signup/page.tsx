'use client';

import signupFormStyles from '@/../styles/auth/form.module.css';
import Spinner from '@/components/spinner';
import API_ROUTES from '@/constants/api-routes';
import { APP_ROUTES } from '@/constants/app-routes';
import Alerts from '@/lib/alerts';
import User from '@/types/user';
import { StatusCodes } from 'http-status-codes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';




export default function SignUpPage() {

	const { register, handleSubmit, reset } = useForm<User>();
	const [disabled, setDisabled] = useState(true);
	const { push } = useRouter();
	const [loading, setLoading] = useState(false);


	const onSubmit: SubmitHandler<User> = async (user) => {
		setLoading(!loading);
		const response = await fetch(API_ROUTES.account.create,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
		setLoading(!loading);
		const body = await response.json();
		if (response.status === StatusCodes.CREATED) {
			reset();
			Alerts.success(body.message);
			return push(APP_ROUTES.public.login);
		}
		Alerts.error(body.message);
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
						{loading ? (
							<Spinner loading={loading} />
						) : (
							'Create account'
						)
						}
					</button>
				</footer>
			</header>
		</form>
	)
}