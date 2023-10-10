"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, FormEvent, ReactNode } from "react";
import utilsStyles from '@/../styles/utils.module.css';
import Spinner from "./spinner";
import { OPACITY_WHILE_LOADING_FALSE, OPACITY_WHILE_LOADING_TRUE } from "@/constants";
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsPencil } from 'react-icons/bs';


type ButtonLinkProps = {
  href?: string;
  text?: string;
}


type SignUpButtonProps = ButtonLinkProps;
type LoginButtonProps = ButtonLinkProps;
type ContactsButtonProps = ButtonLinkProps;
type AddButtons = ButtonLinkProps;


type SubmitButtonProps = {
  runSpinner: boolean;
  disable: boolean;
  content: string;
  spinnerText?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;



type ProfileProps = {
  content: string | ReactNode;
}


export const LoginButton = ({ text = 'Login' }: LoginButtonProps) => {
  return (
    <Link style={{ marginRight: 16 }} href='/login'>
      {text}
    </Link>
  );
};


export const SignUpButton = ({ text = 'Sig up' }: SignUpButtonProps) => {
  return (
    <Link href='/signup'>{text}</Link>
  )
}


export const ContactsButton = ({ text = 'Contacts' }: ContactsButtonProps) => {
  return (
    <Link href='/contacts'>{text}</Link>
  );
}


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
}


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
}


export const HomeButton = () => {
  return (
    <Link href='/'>Home</Link>
  );
}


export const LogoutButton = () => {
  const { push } = useRouter();
  const onClick = () => {
    signOut({ redirect: false })
      .then(() => push('/login'));
  }
  return (
    <Link
      href={''}
      onClick={onClick}
    >
      Sign Out
    </Link>
  );
};


export const ButtonProfile = ({ content }: ProfileProps) => {
  return <Link href="/">{content}</Link>;
};


export const ButtonAdd = ({ href, text = 'Add' }: AddButtons) => {
  return (
    <Link
      href={!href ? ('/contacts/add') : (href)}
      className={utilsStyles.buttonAdd}>{text}</Link>
  )
}


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
  )
};


export const ButtonBack = () => {
  const { back } = useRouter();
  return (
    <Link href='' onClick={() => back()}>&larr;Back</Link>
  )
}
