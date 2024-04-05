import { forwardRef } from 'react';

import clsx from 'clsx';
import { InputProps } from '@/types/form';
import { ErrorMessageContainer } from '..';
import { Label } from './Label';

export const Input = forwardRef<HTMLInputElement, InputProps>(
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
                {label && <Label htmlFor={label}>{label}</Label>}
                <div
                    className={clsx(
                        'flex h-10 items-center gap-2 overflow-hidden rounded-lg border-[0.03rem] focus-within:border-[0.13rem] focus-within:border-sky-500 dark:border-medium dark:bg-gray-800 dark:focus-within:border-blue-500',
                        {
                            'border-[1px] border-red-600 dark:border-red-600':
                                errMessage,
                        },
                    )}
                >
                    {startAdornment && (
                        <span className='ml-5  text-xl'>{startAdornment}</span>
                    )}
                    <input
                        {...rest}
                        className='mx-2 h-6 w-full border-none bg-gray-50 pl-2 pr-2 outline-none focus:bg-white dark:bg-gray-800 dark:text-white dark:focus:bg-medium '
                        id={label}
                        type={type}
                        ref={ref}
                    />
                    {endAdornment && (
                        <span className='mx-2 text-xl'>{endAdornment}</span>
                    )}
                </div>
                <ErrorMessageContainer errMessage={errMessage} />
            </div>
        );
    },
);

Input.displayName = 'Input';
