'use client';

import navStyles from '@/../styles/nav.module.css';
import { useSession } from 'next-auth/react';
import {
	ContactsButton, HomeButton, LoginButton, LogoutButton, SignUpButton, ProfileButton
} from './buttons.component';


export default function Nav() {

	const { data: session } = useSession();

	return (
		<nav className={navStyles.nav} >
			<ul className={navStyles.container}>
				<li>
					<HomeButton href={session ? '/dashboard' : undefined} />
				</li>
				{session && (
					<li>
						<ContactsButton />
					</li>
				)}

			</ul>
			<ul className={navStyles.container}>
				{session ? (
					<>
						<li><LogoutButton /></li>
						<li><ProfileButton content={session.user?.name} /></li>
					</>
				) : (
					<>
						<li><LoginButton /></li>
						<li><SignUpButton /></li>
					</>
				)}
			</ul>
		</nav>
	);
}