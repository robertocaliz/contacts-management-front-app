import { InputHTMLAttributes, ReactNode } from "react"
import inputStyles from '@/../styles/input.module.css';
import { UseFormRegister } from "react-hook-form";

type InputProps = {
	startAdornment?: ReactNode;
	endAdornment?: ReactNode;
	label?: string;
	register?: UseFormRegister<any>
} & InputHTMLAttributes<HTMLInputElement>;


export default function Input({
	name = 'submit',
	label,
	startAdornment,
	endAdornment,
	register,
	...rest
}: InputProps) {
	return (
		<>
			<div style={{ margin: '1rem 0' }}>
				{label && <label htmlFor={label}>{label}</label>}
				<div className={inputStyles.inputContainer}>
					{startAdornment && <span className={inputStyles.adornment}>{startAdornment}</span>}
					<input {...rest} id={label} name={name} {...register?.(name)} />
					{endAdornment && <span className={inputStyles.adornment}>{endAdornment}</span>}
				</div>
			</div>
		</>
	)
}