import { SelectOption } from '@/types';
import { HtmlHTMLAttributes, ReactNode } from 'react';

type SelectProps = {
    label?: string;
    startAdornment?: ReactNode | string;
    endAdornment?: ReactNode | string;
    options: Array<SelectOption>;
} & HtmlHTMLAttributes<HTMLSelectElement>;

const Select = ({
    startAdornment,
    endAdornment,
    label,
    options,
    ...rest
}: SelectProps) => {
    return (
        <div>
            {label && <label htmlFor={label}>{label}</label>}
            <div className='flex items-center gap-2 rounded-lg border-[0.124rem] px-2 focus-within:border-sky-400'>
                {startAdornment && (
                    <span className='ml-3'>{startAdornment}</span>
                )}
                <select
                    {...rest}
                    className='mr-2 h-[2.32rem] w-full bg-white focus:outline-none'
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

export default Select;
