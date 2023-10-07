
'use client';

import Alerts from "@/lib/alerts";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Centralize from "./centralize";
import FormHeader from "./form-header";
import Input from "./input";
import { SubmitButton } from "./buttons.component";
import { User } from "@/types";


interface UserCredentials extends Pick<User, 'email' | 'password'> { }


export default function LoginForm() {
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
		push('/dashboard');
	}

	return (
		<Centralize>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormHeader text='Login' />
				<main>
					<Input
						type='email'
						label='Email:'
						name="email"
						register={register}
					/>
					<Input
						type='password'
						label='Password:'
						name='password'
						register={register}
					/>
					<SubmitButton
						disabled={disabled}
						loading={loading}
						content='login'
						spinnerText='Authenticating...'
					/>
				</main>
			</form>
			<hr />
		</Centralize>
	);
}