'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, FormEvent, ReactNode } from 'react';
import utilsStyles from '@/../styles/utils.module.css';
import Spinner from './spinner';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { TiContacts } from 'react-icons/ti';


type HyperlinkButtonProps = {
	href?: string;
	text?: string;
}


type SignUpButtonProps = HyperlinkButtonProps;
type LoginButtonProps = HyperlinkButtonProps;
type ContactsButtonProps = HyperlinkButtonProps;
type HomeButtonProps = HyperlinkButtonProps;


type SubmitButtonProps = {
	runSpinner: boolean;
	disable: boolean;
	content: string;
	spinnerText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;



type ProfileButtonProps = {
	content: string | ReactNode;
}


export const LoginButton = ({ text = 'Login' }: LoginButtonProps) => {
	return (
		<Link style={{ marginRight: 16 }} href='/login'>
			{text}
		</Link>
	);
};


export const SignUpButton = ({ text = 'Cadastrar' }: SignUpButtonProps) => {
	return (
		<Link href='/signup'>{text}</Link>
	);
};


export const ContactsButton = ({ text = 'Contactos' }: ContactsButtonProps) => {
	return (
		<Link href='/contacts'>{text}</Link>
	);
};


type DeleteButtonProps = {
	handleDelete: (e: FormEvent) => void;
	runSpinner: boolean
}

export const DeleteButton = ({ handleDelete, runSpinner }: DeleteButtonProps) => {
	if (runSpinner) {
		return <Spinner loading={runSpinner} />;
	}
	return (
		<a
			href={''}
			className={`${utilsStyles.colorRed} ${utilsStyles.tableButtonSize}`}
			onClick={handleDelete}
		>
			<RiDeleteBinLine />
		</a >
	);
};


export const UpdateButton = ({ url }: { url: string }) => {
	return (
		<Link
			href={url}
			className={utilsStyles.tableButtonSize}
		>
			<BsPencil />
		</Link>
	);
};



const homeButtonStyles: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	gap: '0.1rem',
};

export const HomeButton = ({ href = '/' }: HomeButtonProps) => {
	return (
		<Link href={href} style={homeButtonStyles}>
			<TiContacts style={{ fontSize: '1.8rem' }} />ContactsPro
		</Link>
	);
};


export const LogoutButton = () => {
	const { push } = useRouter();
	const onClick = () => {
		const logout = confirm('Sair do sistema?');
		if (logout) {
			signOut({ redirect: false })
				.then(() => push('/login'));
		}
	};
	return (
		<Link
			href={''}
			onClick={onClick}
		>
			Logout
		</Link>
	);
};


export const ProfileButton = ({ content }: ProfileButtonProps) => {
	return <Link href='/profile'>{content}</Link>;
};



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


export const OPACITY_WHILE_LOADING_TRUE = 0.5;
export const OPACITY_WHILE_LOADING_FALSE = 1;


export const SubmitButton = ({
	content,
	runSpinner,
	disable,
	spinnerText,
	...rest
}: SubmitButtonProps) => {
	return (
		<button
			type='submit' {...rest}
			className={utilsStyles.buttonSubmit}
			disabled={disable}
			style={runSpinner || disable ? (
				{ opacity: OPACITY_WHILE_LOADING_TRUE }
			) : (
				{ opacity: OPACITY_WHILE_LOADING_FALSE }
			)}
		>
			{runSpinner ? (
				<Spinner loading={runSpinner} text={spinnerText} />
			) : (
				content
			)}
		</button>
	);
};


export const ButtonBack = () => {
	const router = useRouter();
	return (
		<Link
			href={''}
			onClick={() => router.back()}
		>
			&larr;Voltar
		</Link>
	);
};


interface UpdateUserButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> { }


export const UpdateUserButton = ({ ...rest }: UpdateUserButtonProps) => {
	return (
		<Link
			href={''}
			style={{ fontSize: '1.5rem' }}
			{...rest}
		>
			<BsPencil />
		</Link>
	);
};



interface UserProfileBackButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> { }


export const UserProfileBackButton = ({ ...rest }: UserProfileBackButtonProps) => {
	return (
		<Link
			href={''}
			{...rest}
		>
			&larr;Voltar
		</Link>
	);
};




export const SignupRecoverButton = ({ text }: { text: string }) => {
	return (
		<Link
			href='/signup/recover'
		>
			{text}
		</Link>
	);
};