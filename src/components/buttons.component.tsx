'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, CSSProperties, Dispatch, FormEvent, ReactNode, SetStateAction } from 'react';
import utilsStyles from '@/../styles/utils.module.css';
import Spinner from './spinner';
import { OPACITY_WHILE_LOADING_FALSE, OPACITY_WHILE_LOADING_TRUE } from '@/constants';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';
import { TiContacts } from 'react-icons/ti';


type ButtonLinkProps = {
	href?: string;
	text?: string;
}


type SignUpButtonProps = ButtonLinkProps;
type LoginButtonProps = ButtonLinkProps;
type ContactsButtonProps = ButtonLinkProps;
type AddButtons = ButtonLinkProps;
type HomeButtonProps = ButtonLinkProps;


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


export const ContactsButton = ({ text = 'Conctatos' }: ContactsButtonProps) => {
	return (
		<Link href='/contacts'>{text}</Link>
	);
};


export const DeleteButton = ({
	handleDelete
}: { handleDelete: (e: FormEvent) => void }) => {
	return (
		<Link
			href={''}
			className={`${utilsStyles.colorRed} ${utilsStyles.tableButtonSize}`}
			onClick={handleDelete}
		>
			<RiDeleteBinLine />
		</Link >
	);
};


export const UpdateButton = ({
	handleUpdate
}: { handleUpdate: (e: FormEvent) => void }) => {
	return (
		<Link
			href={''}
			className={utilsStyles.tableButtonSize}
			onClick={handleUpdate}
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
	fontSize: '1.8rem'
};

export const HomeButton = ({ href = '/' }: HomeButtonProps) => {
	return (
		<Link href={href}>
			<h1 style={homeButtonStyles}><TiContacts />ContactsPro</h1>
		</Link>
	);
};


export const LogoutButton = () => {
	const { push } = useRouter();
	const onClick = () => {
		signOut({ redirect: false })
			.then(() => push('/login'));
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
	return <Link href='/profile' style={{ fontSize: '2rem' }}>{content}</Link>;
};


export const ButtonAdd = ({ href, text = 'Adicionar' }: AddButtons) => {
	return (
		<Link
			href={!href ? ('/contacts/add') : (href)}
			className={utilsStyles.buttonAdd}>{text}</Link>
	);
};


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
	const { back } = useRouter();
	return (
		<Link href='' onClick={() => back()}>&larr;Voltar</Link>
	);
};


type EditUserButtonProps = {
	edit: boolean;
	setEdit: Dispatch<SetStateAction<boolean>>
}


export const EditUserButton = ({ edit, setEdit }: EditUserButtonProps) => {
	return (
		<Link
			href={''}
			onClick={() => setEdit(!edit)}
			style={{ fontSize: '1.5rem' }}
		>
			<BsPencil />
		</Link>
	);
};


export const EditFormBackButton = ({ edit, setEdit }: EditUserButtonProps) => {
	return (
		<Link href={''} onClick={() => setEdit(!edit)}>&larr;Back</Link>
	);
};