import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type ContactsButtonProps = {
    content?: string | ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ContactsButton = ({
    content = 'Contactos',
    ...rest
}: ContactsButtonProps) => {
    return (
        <Link href='/contacts' {...rest}>
            {content}
        </Link>
    );
};

export default ContactsButton;
