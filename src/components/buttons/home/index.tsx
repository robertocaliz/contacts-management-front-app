import { Caveat } from 'next/font/google';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import { TiContacts } from 'react-icons/ti';

type HomeButtonPorps = {
    href?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const caveat = Caveat({ subsets: ['latin-ext'] });

export const HomeButton = ({ href = '/', ...rest }: HomeButtonPorps) => {
    return (
        <Link href={href} {...rest}>
            <TiContacts className='size-6' />
            <span className={`${caveat.className} text-[1rem]`}>
                ContactsPro
            </span>
        </Link>
    );
};

export default HomeButton;
