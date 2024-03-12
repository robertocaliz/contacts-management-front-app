import { ReactNode, InputHTMLAttributes } from "react";


type CheckBoxProps = {
	label?: string | ReactNode;
	type?: 'checkbox';
} & InputHTMLAttributes<HTMLInputElement>;

const CheckBox = ({ label, ...rest }: CheckBoxProps) => {
	return (
		<div>
			<label className='flex items-center gap-2'>
				<input
					{...rest}
					type='checkbox'
					className='h-5 w-5 cursor-pointer appearance-none rounded border-[0.13rem] border-gray-200 outline-none'
				/>
				<span>{label}</span>
			</label>
		</div>
	);
};

export default CheckBox;
