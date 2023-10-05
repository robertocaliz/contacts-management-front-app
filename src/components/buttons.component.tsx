"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, FormEvent, ReactNode } from "react";
import utilsStyles from '@/../styles/utils.module.css';


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




export const AddButton = ({ href, text = 'Add' }: AddButtons) => {
  return (
    <Link
      href={href}
      className={utilsStyles.addButton}>{text}</Link>
  )
}


type ButtonSubmitProps = {
  content_: string | ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;


export const ButtonSubmit = ({ content_, ...rest }: ButtonSubmitProps) => {
  return (
    <button type="submit" {...rest} >{content_}</button>
  )
}
