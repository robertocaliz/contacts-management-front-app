import { HtmlHTMLAttributes } from 'react';

type Option = {
	value: string;
	select?: boolean;
};

interface DropdownProps extends HtmlHTMLAttributes<HTMLSelectElement> {
	options: Array<Option>;
}

function Dropdown({ options, ...rest }: DropdownProps) {
	return (
		<select {...rest}>
			{options.map(({ value, select }, index) => (
				<option value={value} key={index} selected={select ? true : false}>
					{value}
				</option>
			))}
		</select>
	);
}

export default Dropdown;
