import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type HomeButtonPorps = {
    href?: string;
    content$?: string | ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const HomeButton = ({
    href = '/',
    content$,
    ...rest
}: HomeButtonPorps) => {
    return (
        <Link href={href} {...rest}>
            {content$ ?? 'Home'}
        </Link>
    );
};

export default HomeButton;
