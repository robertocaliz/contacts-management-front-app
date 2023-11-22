import Link from 'next/link';




const ContactsButton = ({ text = 'Contactos' }: { text?: string }) => {
	return (
		<Link href='/contacts'>
			{text}
		</Link>
	);
};


export default ContactsButton;
