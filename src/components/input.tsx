import { forwardRef } from 'react';

import clsx from 'clsx';
import ErrMessageContainer from './err-message-container';
import { InputProps } from '@/types/form';
import Label from './label';

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            startAdornment,
            endAdornment,
            errMessage,
            type = 'text',
            ...rest
        },
        ref,
    ) => {
        return (
            <div className='my-3'>
                {label && (
                    <Label htmlFor={label} className='text-gray-600'>
                        {label}
                    </Label>
                )}
                <div
                    className={clsx(
                        'flex h-10 items-center gap-2 overflow-hidden rounded-lg border-[0.03rem] focus-within:border-[0.13rem] focus-within:border-sky-500 focus-within:transition-all',
                        {
                            'border-[0.10rem] border-red-600': errMessage,
                        },
                    )}
                >
                    {startAdornment && (
                        <span className='ml-5  text-xl'>{startAdornment}</span>
                    )}
                    <input
                        {...rest}
                        className='mx-1 h-8 w-full bg-gray-50 pl-2 pr-2 outline-none focus:bg-white'
                        id={label}
                        type={type}
                        ref={ref}
                    />
                    {endAdornment && (
                        <span className='mx-2 text-xl'>{endAdornment}</span>
                    )}
                </div>
                <ErrMessageContainer errMessage={errMessage} />
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
