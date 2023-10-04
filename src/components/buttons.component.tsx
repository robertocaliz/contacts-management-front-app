"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link
      style={{ marginRight: 16 }}
      href={APP_ROUTES.public.login}
    >
      Sign in
    </Link>
  );
};

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

export const ProfileButton = ({ username }: ProfileProps) => {
  return <Link href="/profile">{username}</Link>;
};
