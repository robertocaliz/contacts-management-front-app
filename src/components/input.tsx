import { InputHTMLAttributes, ReactNode } from "react"
import inputStyles from '@/../styles/input.module.css';

type InputProps = {
	startAdornment?: ReactNode;
	endAdornment?: ReactNode;
	label?: string;
} & InputHTMLAttributes<HTMLInputElement>;


export default function Input({ label, startAdornment, endAdornment, ...rest }: InputProps) {
	return (
		<>
			<div>
				<label htmlFor={label}>{label}</label>
				<div className={inputStyles.inputContainer}>
					<span className={inputStyles.adornment}>{startAdornment}</span>
					<input {...rest} id={label} />
					<span className={inputStyles.adornment}>{endAdornment}</span>
				</div>
			</div>
		</>
	)
}