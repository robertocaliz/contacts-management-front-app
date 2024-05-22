import Spinner from '@/components/spinner';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type SubmitButtonProps = {
    content: string;
    spinnerText?: string;
    submittingForm: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton = ({
    content,
    spinnerText,
    disabled,
    submittingForm,
    ...props
}: SubmitButtonProps) => {
    return (
        <button
            {...props}
            className={clsx(
                'my-3 w-full rounded-lg bg-green-600 p-[0.7rem] font-bold text-white shadow-lg duration-300 hover:bg-green-700  focus:border-none',
                {
                    'opacity-[0.8]': disabled || submittingForm,
                },
            )}
            disabled={disabled ?? submittingForm}
        >
            {submittingForm ? (
                <Spinner loading={submittingForm} text={spinnerText} />
            ) : (
                content
            )}
        </button>
    );
};

export default SubmitButton;
