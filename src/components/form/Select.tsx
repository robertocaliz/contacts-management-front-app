import { SelectOption } from '@/types';
import { HtmlHTMLAttributes, ReactNode } from 'react';
import { Label } from './Label';

type SelectProps = {
    label?: string;
    startAdornment?: ReactNode | string;
    endAdornment?: ReactNode | string;
    options: Array<SelectOption>;
} & HtmlHTMLAttributes<HTMLSelectElement>;

export const Select = ({
    startAdornment,
    endAdornment,
    label,
    options,
    ...props
}: SelectProps) => {
    return (
        <div>
            {label && <Label htmlFor={label}>{label}</Label>}
            <div className='flex h-10 items-center gap-2 rounded-lg border-[0.03rem] px-2 focus-within:border-[0.13rem] focus-within:border-sky-400 dark:border-none dark:bg-gray-800'>
                {startAdornment && (
                    <span className='ml-3'>{startAdornment}</span>
                )}
                <select
                    {...props}
                    className='h-6 w-full bg-gray-50 focus:bg-white focus:outline-none dark:bg-gray-800 dark:text-white dark:focus:bg-medium'
                    id={label}
                >
                    {options.map(({ value, content }, index) => (
                        <option value={value} key={index}>
                            {content}
                        </option>
                    ))}
                </select>
                {endAdornment && <span className='mx-2'>{endAdornment}</span>}
            </div>
        </div>
    );
};
