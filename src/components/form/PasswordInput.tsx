'use client';

import { forwardRef, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import clsx from 'clsx';
import { InputProps } from '@/types/form';
import { ErrorMessageContainer } from '..';
import { Label } from './Label';

type PasswordInputProps = {
    type?: 'password';
} & InputProps;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label, startAdornment, errMessage, ...props }, ref) => {
        const [displayPassword, setDisplayPassword] = useState(false);
        const [typePassword, setTypePassword] = useState(true);

        const handleEyeClick = () => {
            setDisplayPassword(!displayPassword);
            setTypePassword(!typePassword);
        };

        return (
            <>
                <div className='mb-3'>
                    {label && <Label htmlFor={label}>{label}</Label>}
                    <div
                        className={clsx(
                            'flex h-10 items-center gap-2 overflow-hidden rounded-lg border-[0.03rem] focus-within:border-[0.12rem] focus-within:border-sky-500 dark:border-medium dark:bg-gray-800 dark:focus-within:border-sky-500',
                            {
                                'border-[1px] border-red-600 dark:border-red-600':
                                    errMessage,
                            },
                        )}
                    >
                        {startAdornment && (
                            <span className='ml-5 text-xl text-green-600'>
                                {startAdornment}
                            </span>
                        )}
                        <input
                            {...props}
                            id={label}
                            className='mx-2 h-6 w-full bg-gray-50 pl-2 pr-2 text-slate-600 outline-none focus:bg-white dark:bg-gray-800 dark:text-white dark:focus:bg-medium'
                            type={typePassword ? 'password' : 'text'}
                            ref={ref}
                        />
                        <span
                            onClick={handleEyeClick}
                            className='mr-3 cursor-pointer rounded-md p-1 text-[1.4rem] text-green-600 dark:hover:bg-medium'
                        >
                            {displayPassword ? (
                                <AiOutlineEyeInvisible title='ocultar senha' />
                            ) : (
                                <AiOutlineEye title='visualizar senha' />
                            )}
                        </span>
                    </div>
                    <ErrorMessageContainer errMessage={errMessage} />
                </div>
            </>
        );
    },
);

PasswordInput.displayName = 'PasswordInput';
