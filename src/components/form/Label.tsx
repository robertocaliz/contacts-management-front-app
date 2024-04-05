import { LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ ...rest }: LabelProps) => {
    return (
        <label {...rest} className='font-bold text-gray-600 dark:text-white' />
    );
};
