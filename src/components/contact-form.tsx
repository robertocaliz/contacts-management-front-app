import { ContactFormProps } from "@/types";
import { ButtonBack, SubmitButton } from "./buttons.component";
import Centralize from "./centralize";
import FormHeader from "./form-header";
import Input from "./input";


export default function ContactForm({
	register,
	handleSubmit,
	onSubmit,
	loading,
	disabled,
	buttonContent,
	header = 'Add Contact'
}: ContactFormProps) {
	return (
		<>
			<Centralize>
				<ButtonBack />
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormHeader text={header} />
					<Input
						type="text"
						name="name"
						label="Name:"
						register={register}
					/>
					<Input
						type="email"
						name="email"
						label="Email:"
						register={register}
					/>
					<Input
						type="text"
						name="phoneNumber"
						label="Phone number:"
						register={register}
					/>
					<SubmitButton
						disabled={disabled}
						loading={loading}
						content={buttonContent}
					/>
				</form>
				<hr />
			</Centralize>
		</>
	);
}