"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, FormEvent, ReactNode } from "react";
import utilsStyles from '@/../styles/utils.module.css';
import Spinner from "./spinner";
import { OPACITY_WHILE_LOADING_FALSE, OPACITY_WHILE_LOADING_TRUE } from "@/constants";


type ButtonLinkProps = {
  href?: string;
  text?: string;
}


type SignUpButtonProps = ButtonLinkProps;
type LoginButtonProps = ButtonLinkProps;
type ContactsButtonProps = ButtonLinkProps;
type AddButtons = ButtonLinkProps;


type SubmitButtonProps = {
  loading: boolean;
  disabled: boolean;
  content: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;



type ProfileProps = {
  content: string | ReactNode;
}


export const LoginButton = ({ text = 'Sign in' }: LoginButtonProps) => {
  return (
    <Link style={{ marginRight: 16 }} href='/signin'>
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


export const HomeButton = () => {
  return (
    <Link href='/'>Home</Link>
  );
}


export const LogoutButton = () => {
  const { push } = useRouter();
  const onClick = (e: FormEvent) => {
    signOut({ redirect: false })
      .then(() => {
        push('/');
      });
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
  loading,
  disabled,
  ...rest
}: SubmitButtonProps) => {
  return (
    <button
      type='submit' {...rest}
      className={utilsStyles.buttonSubmit}
      disabled={disabled}
      style={loading ? (
        { opacity: OPACITY_WHILE_LOADING_TRUE }
      ) : (
        { opacity: OPACITY_WHILE_LOADING_FALSE }
      )}
    >
      {loading ? (
        <Spinner loading={loading} />
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
