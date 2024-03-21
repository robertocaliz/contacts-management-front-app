import Link from 'next/link';
import { ReactNode, AnchorHTMLAttributes } from 'react';

type LoginButtonProps = {
    content?: string | ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const LoginButton = ({
    content = 'Login',
    ...rest
}: LoginButtonProps) => {
    return (
        <Link href='/login' {...rest}>
            {content}
        </Link>
    );
};

export default LoginButton;
