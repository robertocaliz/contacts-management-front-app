import { forwardRef, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import clsx from 'clsx';
import ErrMessageContainer from './err-message-container';
import { InputProps } from '@/types/form';
import Label from './label';

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
                <div>
                    {label && (
                        <Label htmlFor={label} className='text-gray-800'>
                            {label}
                        </Label>
                    )}
                    <div
                        className={clsx(
                            'mb-3 mt-3 flex h-10 items-center gap-2 overflow-hidden rounded-lg border-[0.124rem] focus-within:border-[0.13rem] focus-within:border-sky-500 focus-within:transition-all',
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
                            className='h-12 w-full pl-2 pr-2 text-slate-600 outline-none'
                            type={typePassword ? 'password' : 'text'}
                            ref={ref}
                        />
                        <span
                            onClick={handleEyeClick}
                            className='mr-3 cursor-pointer text-[1.4rem] text-green-600'
                        >
                            {displayPassword ? (
                                <AiOutlineEyeInvisible title='ocultar senha' />
                            ) : (
                                <AiOutlineEye title='visualizar senha' />
                            )}
                        </span>
                    </div>
                </div>
                <ErrMessageContainer errMessage={errMessage} />
            </>
        );
    },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
