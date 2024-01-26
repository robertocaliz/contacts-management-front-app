import { HtmlHTMLAttributes, ReactNode } from 'react';

type Option = {
	value: string;
	select?: boolean;
};

type SelectProps = {
	label?: string;
	startAdornment?: ReactNode | string;
	endAdornment?: ReactNode | string;
	options: Array<Option>;
	defaultValue?: string;
} & HtmlHTMLAttributes<HTMLSelectElement>;

function Select({
	startAdornment,
	endAdornment,
	label,
	options,
	defaultValue,
	...rest
}: SelectProps) {
	return (
		<div>
			{label && <label htmlFor={label}>{label}</label>}
			<div className='mt-3  flex items-center gap-2 rounded-lg border-2 focus-within:border-sky-400'>
				{startAdornment && (
					<span className='text-3xl text-sky-400'>{startAdornment}</span>
				)}
				<select
					{...rest}
					className='mr-2 h-12 w-full bg-white text-slate-600 focus:outline-none'
					defaultValue={defaultValue}
					id={label}
				>
					{options.map(({ value }, index) => (
						<option value={value} key={index}>
							{value}
						</option>
					))}
				</select>
				{endAdornment && <span className='text-3xl'>{endAdornment}</span>}
			</div>
		</div>
	);
}

export default Select;
