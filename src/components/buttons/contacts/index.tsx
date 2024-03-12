import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

type ContactsButton = {
	text?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ContactsButton = ({ text = 'Contactos', ...rest }: ContactsButton) => {
	return (
		<Link href='/contacts' {...rest}>
			{text}
		</Link>
	);
};

export default ContactsButton;
