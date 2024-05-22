import { LabelHTMLAttributes } from 'react';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ ...props }: LabelProps) => {
    return (
        <label {...props} className='font-bold text-gray-600 dark:text-white' />
    );
};
