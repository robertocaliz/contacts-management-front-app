import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type SignUpButtonProps = {
    content?: string | ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const SignUpButton = ({
    content = 'Cadastrar',
    ...rest
}: SignUpButtonProps) => {
    return (
        <Link href='/signup' {...rest}>
            {content}
        </Link>
    );
};

export default SignUpButton;
