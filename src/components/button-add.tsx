'use client';

import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface ButtonAddProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	text?: string;
}

const ButtonAdd = ({ href, text = 'Adicionar', ...rest }: ButtonAddProps) => {
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

export default ButtonAdd;
