'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	AnchorHTMLAttributes
} from 'react';
import utilsStyles from '@/../styles/utils.module.css';

interface ButtonAddProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string,
	text?: string
}


export const ButtonAdd = ({ href, text = 'Adicionar', ...rest }: ButtonAddProps) => {
	return (
		<Link
			href={href}
			className={utilsStyles.buttonAdd}
			{...rest}
		>
			{text}
		</Link>
	);
};


export const ButtonBack = () => {
	const router = useRouter();
	return (
		<button
			onClick={() => router.back()}
		>
			&larr;Voltar
		</button>
	);
};