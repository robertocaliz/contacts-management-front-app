"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";


type ButtonLinkProps = {
  href: string;
  text?: string;
}


type SignUpButtonProps = ButtonLinkProps;
type LoginButtonProps = ButtonLinkProps;
type ContactsButtonProps = ButtonLinkProps;



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
  return (
    <Link
      style={{ marginRight: 10 }}
      href={''}
      onClick={() => signOut({ redirect: false })}
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
