'use client';

import { ButtonSubmit } from "@/components/buttons.component";
import Centralize from "@/components/centralize";
import Input from "@/components/input";
import utilsStyles from '@/../styles/utils.module.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { Contact } from "@/types";
import { StatusCodes } from "http-status-codes";
import Alerts from "@/lib/alerts";
import { useState } from "react";
import Spinner from "@/components/spinner";
import { OPACITY_WHILE_LOADING_FALSE, OPACITY_WHILE_LOADING_TRUE } from "@/constants";



export default function AddContactPage() {

	const { register, handleSubmit, reset } = useForm<Contact>();
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const onSubmit: SubmitHandler<Contact> = async (contact) => {
		setLoading(true);
		setDisabled(true);
		const response = await fetch('/api/contacts',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(contact)
			});
		const { message } = await response.json();
		setLoading(false);
		setDisabled(false);
		if (response.status === StatusCodes.CREATED) {
			reset();
			Alerts.success(message);
			return;
		}
		Alerts.error(message);
	}

	return (
		<>
			<Centralize>
				<form onSubmit={handleSubmit(onSubmit)}>
					<header>
						<h1>Add Contact</h1>
					</header>
					<Input
						type="text"
						name="name"
						label="Name:"
						register={register}
					/>
					<Input
						type="email"
						name="email"
						label="Email"
						register={register}
					/>
					<Input
						type="text"
						name="phoneNumber"
						label="Phone number:"
						register={register} />
					<ButtonSubmit
						content_={loading ? (
							<Spinner loading={loading} />
						) : (
							'Create contact'
						)}
						className={utilsStyles.buttonSubmit}
						disabled={disabled}
						style={loading ? (
							{ opacity: OPACITY_WHILE_LOADING_TRUE }
						) : (
							{ opacity: OPACITY_WHILE_LOADING_FALSE }
						)}
					/>
				</form>
				<hr />
			</Centralize>
		</>
	);
}