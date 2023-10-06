import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Contact } from '.';


export type ContactFormProps = {
	onSubmit: SubmitHandler<Contact>;
	handleSubmit: UseFormHandleSubmit<Contact, undefined>;
	register: UseFormRegister<Contact>;
	loading: boolean;
	disabled: boolean;
	buttonContent: string;
	header?: string;
}