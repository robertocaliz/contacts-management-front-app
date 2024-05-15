import Spinner from '@/components/spinner';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
    content: string;
    spinnerText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton = ({
    content,
    spinnerText,
    disabled,
    ...rest
}: SubmitButtonProps) => {
    const { pending } = useFormStatus();
    return (
        <button
            {...rest}
            className={clsx(
                'my-3 w-full rounded-lg bg-green-600 p-[0.7rem] font-bold text-white shadow-lg duration-300 hover:bg-green-700  focus:border-none',
                {
                    'opacity-[0.8]': disabled || pending,
                },
            )}
            disabled={disabled ?? pending}
        >
            {pending ? (
                <Spinner loading={pending} text={spinnerText} />
            ) : (
                content
            )}
        </button>
    );
};

export default SubmitButton;
