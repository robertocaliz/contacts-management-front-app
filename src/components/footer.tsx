import Link from 'next/link';

import footerStyles from '@/../styles/footer.module.css';


export default function Footer() {
	return (
		<footer className={footerStyles.footer}>
			<ul>
				<li>
					<Link
						href='https://github.com/robertocaliz/contacts-management-front-app'
						target="_blank"
					>
						GitHub
					</Link>
				</li>
				<li>
					<Link href='/'>Sobre</Link>
				</li>
				<li>
					<Link href='/'>Desenvolvedor</Link>
				</li>
				<li>
					<Link href='/terms-of-use'>Termos de uso</Link>
				</li>
			</ul>
		</footer>
	);
}