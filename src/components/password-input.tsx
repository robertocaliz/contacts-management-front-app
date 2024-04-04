import { forwardRef, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import clsx from 'clsx';
import ErrMessageContainer from './err-message-container';
import { InputProps } from '@/types/form';
import { Label } from '.';

type PasswordInputProps = {
    type?: 'password';
} & InputProps;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ name = 'submit', label, startAdornment, errMessage, ...rest }, ref) => {
        const [displayPassword, setDisplayPassword] = useState(false);
        const [typePassword, setTypePassword] = useState(true);

        const handleEyeClick = () => {
            setDisplayPassword(!displayPassword);
            setTypePassword(!typePassword);
        };

        return (
            <>
                <div className='mb-3'>
                    {label && (
                        <Label htmlFor={label} className='text-gray-800'>
                            {label}
                        </Label>
                    )}
                    <div
                        className={clsx(
                            'flex h-10 items-center gap-2 overflow-hidden rounded-lg border-[0.03rem] focus-within:border-[0.12rem] focus-within:border-sky-500 dark:border-none dark:bg-gray-800',
                            {
                                'border-[0.10rem] border-red-600': errMessage,
                            },
                        )}
                    >
                        {startAdornment && (
                            <span className='ml-5  text-xl text-sky-500'>
                                {startAdornment}
                            </span>
                        )}
                        <input
                            {...rest}
                            id={label}
                            name={name}
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
                    <ErrMessageContainer errMessage={errMessage} />
                </div>
            </>
        );
    },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
