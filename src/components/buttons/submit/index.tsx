import Spinner from '@/components/spinner';
import { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import utilsStyles from '@/../styles/utils.module.css';


type SubmitButtonProps = {
	content: string;
	spinnerText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;


const SubmitButton = ({
	content,
	spinnerText,
	disabled,
	...rest
}: SubmitButtonProps) => {
	const { pending } = useFormStatus();
	return (
		<button
			{...rest}
			className={utilsStyles.buttonSubmit}
			disabled={disabled ?? pending}
			style={disabled || pending ? (
				{ opacity: 0.5 }
			) : (
				{ opacity: 1 }
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