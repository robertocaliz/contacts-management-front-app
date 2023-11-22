import Spinner from '@/components/spinner';
import { ButtonHTMLAttributes } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import utilsStyles from '@/../styles/utils.module.css';


type SubmitButtonProps = {
	content: string;
	spinnerText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;



export const OPACITY_WHILE_LOADING_TRUE = 0.5;
export const OPACITY_WHILE_LOADING_FALSE = 1;


const SubmitButton = ({
	content,
	spinnerText,
	disabled,
	...rest
}: SubmitButtonProps) => {
	const { pending } = useFormStatus();
	return (
		<button
			type='submit'
			{...rest}
			className={utilsStyles.buttonSubmit}
			disabled={disabled ?? pending}
			style={disabled || pending ? (
				{ opacity: OPACITY_WHILE_LOADING_TRUE }
			) : (
				{ opacity: OPACITY_WHILE_LOADING_FALSE }
			)}
		>
			{pending ? (
				<Spinner
					loading={pending}
					text={spinnerText}
				/>
			) : (
				content
			)}
		</button>
	);
};


export default SubmitButton;