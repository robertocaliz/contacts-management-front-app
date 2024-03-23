'use client';

import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

type AddButtonProps = {
    href: string;
    text?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const AddButton = ({
    href,
    text = 'Adicionar',
    ...rest
}: AddButtonProps) => {
    return (
        <Link
            href={href}
            {...rest}
            className='rounded-full bg-green-500 px-5 py-[0.8rem] font-bold text-white hover:bg-green-600 focus:border-[0.6rem] focus:border-green-100'
        >
            {text}
        </Link>
    );
};
