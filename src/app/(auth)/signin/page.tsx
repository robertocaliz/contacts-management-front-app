'use client';


import { APP_ROUTES } from "@/constants/app-routes";
import Alerts from "@/lib/alerts";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Centralize from "@/components/centralize";
import User from "@/types/user";
import Input from "@/components/input";
import { SubmitButton } from "@/components/buttons.component";
import FormHeader from "@/components/form-header";


interface UserCredentials extends Pick<User, 'email' | 'password'> { }


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

	return (
		<Centralize>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormHeader text='Login' />
				<main>
					<Input
						type="email"
						label="Email:"
						name="email"
						register={register}
					/>
					<Input
						type="password"
						label="Password:"
						name='password'
						register={register}
					/>
					<SubmitButton
						disabled={disabled}
						loading={loading}
						content='login'
					/>
				</main>
			</form>
			<hr />
		</Centralize>
	);
};