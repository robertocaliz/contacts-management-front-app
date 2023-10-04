'use client';

import Spinner from "@/components/spinner";
import { APP_ROUTES } from "@/constants/app-routes";
import Alerts from "@/lib/alerts";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import loginFormStyles from '@/../styles/auth/form.module.css';


type UserCredentials = {
	email: string,
	password: string
};


export default function SignInPage() {

	const [loading, setLoading] = useState(false);
	const { push } = useRouter();
	const { register, handleSubmit } = useForm<UserCredentials>();
	const [disabled, setDisabled] = useState(false);

	const onSubmit: SubmitHandler<UserCredentials> = async (credentials) => {
		setLoading(true);
		setDisabled(true);

		const response = await signIn('credentials', {
			...credentials,
			redirect: false,
		});

		setLoading(false);
		setDisabled(false);

		if (response?.error !== null) {
			Alerts.error(response?.error as string);
			return;
		}

		push(APP_ROUTES.private.dashboard);

	}

	return <>
		<form onSubmit={handleSubmit(onSubmit)} className={loginFormStyles.form}>
			<header>
				<h1>Login</h1>
			</header>
			<main>
				<div className="field">
					<label htmlFor="email">Email: </label>
					<input
						className={loginFormStyles.inputField}
						{...register('email')}
						type="email"
						name="email"
						id="email"
					/>
				</div>
				<div className="field">
					<label htmlFor="password">Password: </label>
					<input
						className={loginFormStyles.inputField}
						{...register('password')}
						type="password"
						name="password"
						id="password" />
				</div>
				<button
					disabled={disabled}
					style={disabled ? { opacity: 0.5 } : { opacity: 1 }}
					type="submit">
					{loading ? (
						<Spinner loading={loading} />
					) : (
						'Login'
					)}
				</button>
			</main>
		</form>
	</>
};