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
            className='rounded-lg bg-green-600 px-5 py-[0.6rem] font-bold text-white hover:bg-green-600 focus:border-[0.2rem] focus:border-green-100'
        >
            {text}
        </Link>
    );
};
