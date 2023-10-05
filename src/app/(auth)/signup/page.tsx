'use client';

import signupFormStyles from '@/../styles/auth/form.module.css';
import { ButtonSubmit } from '@/components/buttons.component';
import Centralize from '@/components/centralize';
import FormHeader from '@/components/form-header';
import Input from '@/components/input';
import Spinner from '@/components/spinner';
import { OPACITY_WHILE_LOADING_FALSE, OPACITY_WHILE_LOADING_TRUE } from '@/constants';
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
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const { push } = useRouter();

	const onSubmit: SubmitHandler<User> = async (user) => {
		setLoading(true);
		setDisabled(true);
		const response = await fetch(APP_ROUTES.public.users.account.create,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			});
		setLoading(false);
		setDisabled(false);
		const body = await response.json();
		if (response.status === StatusCodes.CREATED) {
			reset();
			Alerts.success(body.message);
			return push(APP_ROUTES.public.login);
		}
		Alerts.error(body.message);
	}


	return (
		<Centralize>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormHeader text='Sign up' />
				<main>
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
						type='password'
						label='Password'
						name='password'
						register={register}
					/>
					<Input
						type='password'
						label='Confirm password:'
						name='confirmPassword'
						register={register}
					/>
				</main>
				<footer>
					<section>
						<input
							type="checkbox"
							onChange={() => setDisabled(!disabled)}
						/>
						<span> I have read and agree to the <Link href='/'>Terms of Use.</Link></span>
					</section>
					<ButtonSubmit
						content_={loading ? (
							<Spinner loading={loading} />
						) : (
							'Create account'
						)}
						disabled={disabled}
						style={loading ? (
							{ opacity: OPACITY_WHILE_LOADING_TRUE }
						) : (
							{ opacity: OPACITY_WHILE_LOADING_FALSE }
						)}
					/>
				</footer>
			</form>
			<hr />
		</Centralize>
	)
}