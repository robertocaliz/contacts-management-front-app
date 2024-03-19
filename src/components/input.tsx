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
            <div>
                {label && (
                    <Label htmlFor={label} className='text-gray-800'>
                        {label}
                    </Label>
                )}
                <div
                    className={clsx(
                        'mb-3 mt-3 flex h-12 items-center gap-2 overflow-hidden rounded-lg border-[0.13rem] focus-within:border-[0.13rem] focus-within:border-sky-500 focus-within:transition-all',
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
                        className='h-12 w-full pl-2 pr-2 outline-none'
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
