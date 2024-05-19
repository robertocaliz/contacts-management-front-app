'use client';

import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

type ButtonCreateProps = {
    href: string;
    text?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const ButtonCreate: React.FC<ButtonCreateProps> = (
    href,
    text = 'Criar',
    ...rest
) => {
    return (
        <Link
            href={href}
            {...rest}
            className='rounded-lg bg-green-600 px-5 py-[0.6rem] font-bold text-white shadow-lg duration-300 hover:bg-green-700 focus:border-[0.2rem] focus:border-green-100'
        >
            {text}
        </Link>
    );
};
