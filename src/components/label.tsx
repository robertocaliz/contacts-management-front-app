import { LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ ...rest }: LabelProps) => {
	return <label {...rest} className='font-bold text-gray-900' />;
};

export default Label;
