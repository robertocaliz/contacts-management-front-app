"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, FormEvent, ReactNode } from "react";
import utilsStyles from '@/../styles/utils.module.css';
import Spinner from "./spinner";
import { OPACITY_WHILE_LOADING_FALSE, OPACITY_WHILE_LOADING_TRUE } from "@/constants";


type ButtonLinkProps = {
  href: string;
  text?: string;
}


type SignUpButtonProps = ButtonLinkProps;
type LoginButtonProps = ButtonLinkProps;
type ContactsButtonProps = ButtonLinkProps;
type AddButtons = ButtonLinkProps;



export const LoginButton = ({ href, text = 'Sign in' }: LoginButtonProps) => {
  return (
    <Link style={{ marginRight: 16 }} href={href}>
      {text}
    </Link>
  );
};


export const SignUpButton = ({ href, text = 'Sig up' }: SignUpButtonProps) => {
  return (
    <Link href={href}>{text}</Link>
  )
}


export const ContactsButton = ({ href, text = 'Contacts' }: ContactsButtonProps) => {
  return (
    <Link href={href}>{text}</Link>
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
        push(APP_ROUTES.public.home);
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



type ProfileProps = {
  content: string | ReactNode;
}

export const UserButton = ({ content }: ProfileProps) => {
  return <Link href="/profile">{content}</Link>;
};



export const ButtonAdd = ({ href, text = 'Add' }: AddButtons) => {
  return (
    <Link
      href={href}
      className={utilsStyles.buttonAdd}>{text}</Link>
  )
}


type SubmitButtonProps = {
  loading: boolean;
  disabled: boolean;
  content: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;


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
