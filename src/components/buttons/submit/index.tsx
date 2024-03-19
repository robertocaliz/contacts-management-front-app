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
                'my-4 w-full rounded-full bg-green-600 p-[0.8rem] font-bold text-white hover:bg-green-700 hover:transition-all focus:border-[0.8rem] focus:border-green-100',
                {
                    'opacity-[0.5]': disabled || pending,
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
