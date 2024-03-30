'use client';

import clsx from 'clsx';
import { ReactNode, InputHTMLAttributes, useState } from 'react';

type CheckBoxProps = {
    label?: string | ReactNode;
    type?: 'checkbox';
} & InputHTMLAttributes<HTMLInputElement>;

export const CheckBox = ({ label, ...rest }: CheckBoxProps) => {
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(!checked);
    };
    return (
        <div className='mt-2'>
            <label className='flex items-center gap-2'>
                <input
                    {...rest}
                    type='checkbox'
                    className={clsx(
                        'h-5 w-5 cursor-pointer appearance-none rounded border-[0.13rem] border-gray-200 outline-none',
                        {
                            'bg-blue-600': checked,
                        },
                    )}
                    onClick={handleChange}
                />
                <span>{label}</span>
            </label>
        </div>
    );
};
