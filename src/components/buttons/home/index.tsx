import { Caveat } from 'next/font/google';
import Link from 'next/link';
import { CSSProperties } from 'react';
import { TiContacts } from 'react-icons/ti';


const homeButtonStyles: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	gap: '0.1rem',
};


const caveat = Caveat({ subsets: ['latin'] });


export const HomeButton = ({ href = '/' }: { href?: string }) => {
	return (
		<Link href={href} style={homeButtonStyles}>
			<TiContacts style={{ fontSize: '1.8rem' }} />
			<span
				className={caveat.className}
				style={{ fontSize: '1.5rem' }}
			>
				ContactsPro
			</span>
		</Link>
	);
};


export default HomeButton;