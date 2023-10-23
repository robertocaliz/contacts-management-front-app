

import { InputHTMLAttributes, ReactNode, useState } from 'react';
import inputStyles from '@/../styles/input.module.css';
import { UseFormRegister } from 'react-hook-form';
import { TbInfoTriangle } from 'react-icons/tb';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';


type InputProps = {
	startAdornment?: ReactNode | string;
	label?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register?: UseFormRegister<any>,
	error?: string,
	type?: 'password'
} & InputHTMLAttributes<HTMLInputElement>;


export default function PasswordInput({
	name = 'submit',
	label,
	startAdornment,
	register,
	error,
	onBlur,
	...rest
}: InputProps) {


	const [displayPassword, setDisplayPassword] = useState(false);
	const [typePassword, setTypePassword] = useState(true);

	const handleEyeClick = () => {
		setDisplayPassword(!displayPassword);
		setTypePassword(!typePassword);
	};

	return (
		<>
			<div style={{ margin: '1rem 0' }}>
				{label && (
					<label htmlFor={label}>{label}</label>
				)}
				<div className={inputStyles.inputContainer} style={error ? { border: '2px solid tomato' } : {}} onBlur={onBlur}>
					{startAdornment && <span className={inputStyles.adornment}>{startAdornment}</span>}
					<input
						{...rest}
						id={label}
						name={name}
						{...register?.(name)}
						type={typePassword ? 'password' : 'text'}
					/>
					<span
						onClick={handleEyeClick}
						className={inputStyles.adornment}>
						{displayPassword ? (
							<AiOutlineEyeInvisible title='ocultar senha' />
						) : (
							<AiOutlineEye title='visualizar senha' />
						)}
					</span>
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