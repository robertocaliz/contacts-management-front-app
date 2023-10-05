'use client';

import { ButtonSubmit } from "@/components/buttons.component";
import Centralize from "@/components/centralize";
import Input from "@/components/input";
import utilsStyles from '@/../styles/utils.module.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { Contact } from "@/types";



export default function AddContactPage() {
	const { register, handleSubmit, reset } = useForm<Contact>();

	const onSubmit: SubmitHandler<Contact> = (contact) => {
		console.log(contact);
		reset();
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
						value='Create contact'
						className={utilsStyles.buttonSubmit}
					/>
				</form>
				<hr />
			</Centralize>
		</>
	);
}