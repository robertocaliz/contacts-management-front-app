"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { signOut } from "next-auth/react";
import Link from "next/link";


type ButtonLinkProps = {
  href: string;
  text?: string;
}


type SignUpButtonProps = ButtonLinkProps;
type LoginButtonProps = ButtonLinkProps;



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
  username: string
}

export const UserButton = ({ username }: ProfileProps) => {
  return <Link href="/profile">{username}</Link>;
};
