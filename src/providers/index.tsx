import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export const NextAuthSessionProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    return <SessionProvider>{children}</SessionProvider>;
};
