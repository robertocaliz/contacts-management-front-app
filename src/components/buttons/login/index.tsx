import Link from 'next/link';
import { ReactNode, AnchorHTMLAttributes } from 'react';

type LoginButtonProps = {
    content?: string | ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const LoginButton = ({
    content = 'Login',
    ...props
}: LoginButtonProps) => {
    return (
        <Link href='/login' {...props}>
            {content}
        </Link>
    );
};

export default LoginButton;
