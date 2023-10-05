import Link from "next/link";

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
					<Link href='/'>About</Link>
				</li>
				<li>
					<Link href='/'>Developer</Link>
				</li>
				<li>
					<Link href='/'>Terms of use</Link>
				</li>
			</ul>
		</footer>
	);
}