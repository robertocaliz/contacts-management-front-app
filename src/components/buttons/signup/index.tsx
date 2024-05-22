import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type SignUpButtonProps = {
    content?: string | ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const SignUpButton = ({
    content = 'Cadastrar',
    ...props
}: SignUpButtonProps) => {
    return (
        <Link href='/signup' {...props}>
            {content}
        </Link>
    );
};

export default SignUpButton;
