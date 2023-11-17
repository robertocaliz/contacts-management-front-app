import { InputHTMLAttributes, ReactNode } from 'react';
import inputStyles from '@/../styles/input.module.css';
import { UseFormRegister } from 'react-hook-form';
import { TbInfoTriangle } from 'react-icons/tb';

type InputProps = {
	startAdornment?: ReactNode | string;
	endAdornment?: ReactNode | string;
	label?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register?: UseFormRegister<any>,
	error?: string
} & InputHTMLAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLDivElement>;



export default function Input({
	name = 'submit',
	label,
	startAdornment,
	endAdornment,
	register,
	onBlur,
	error,
	...rest
}: InputProps) {
	return (
		<>
			<div style={{ margin: '1rem 0' }} {...rest}>
				{label && <label htmlFor={label}>{label}</label>}
				<div className={inputStyles.inputContainer} style={error ? { outline: '1px solid tomato' } : {}} onBlur={onBlur}>
					{startAdornment && <span className={inputStyles.adornment}>{startAdornment}</span>}
					<input {...rest} id={label} name={name} {...register?.(name)} />
					{endAdornment && <span className={inputStyles.adornment}>{endAdornment}</span>}
				</div>
				<span className={inputStyles.errorContainer}>
					{error && (
						<>
							<TbInfoTriangle />
							{error}
						</>
					)}
				</span>

			</div >
		</>
	);
}