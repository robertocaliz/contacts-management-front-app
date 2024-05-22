import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type ContactsButtonProps = {
    content?: string | ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ContactsButton = ({
    content = 'Contactos',
    ...props
}: ContactsButtonProps) => {
    return (
        <Link href='/contacts' {...props}>
            {content}
        </Link>
    );
};

export default ContactsButton;
