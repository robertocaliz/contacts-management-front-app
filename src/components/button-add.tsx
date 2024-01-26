'use client';

import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface ButtonAddProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	text?: string;
}

const ButtonAdd = ({ href, text = 'Adicionar', ...rest }: ButtonAddProps) => {
	return (
		<Link href={href} {...rest}>
			{text}
		</Link>
	);
};

export default ButtonAdd;
