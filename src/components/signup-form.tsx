'use client';

import { User } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Centralize from "./centralize";
import FormHeader from "./form-header";
import Input from "./input";
import { SubmitButton } from "./buttons.component";
import Link from "next/link";
import { StatusCodes } from "http-status-codes";
import Alerts from "@/lib/alerts";



export default function SignUpForm() {

	const { register, handleSubmit, reset } = useForm<User>();
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const { push } = useRouter();


	const onSubmit: SubmitHandler<User> = (user) => {
		setLoading(true);
		setDisabled(true);
		fetch('/api/users',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			})
			.then(res => {
				return (res.status === StatusCodes.CREATED) ? res.json() : Promise.resolve();
			})
			.then(resBody => {
				reset();
				Alerts.success(resBody.message);
				return push('/login');
			})
			.catch(() => {
				Alerts.error('Error while creating account!');
			})
			.finally(() => {
				setLoading(false);
				setDisabled(false);
			});
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
						<span> I have read and agree to the <Link href='/terms-of-use'>Terms of Use.</Link></span>
					</section>
					<SubmitButton
						disabled={disabled}
						loading={loading}
						content='Create account'
						spinnerText='Creating account...'
					/>
				</footer>
			</form>
			<hr />
		</Centralize>
	)
}