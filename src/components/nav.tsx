'use client';

import navStyles from '@/../styles/nav.module.css';
import { useSession } from 'next-auth/react';
import HomeButton from './buttons/home';
import LogoutButton from './buttons/logout';
import LoginButton from './buttons/login';
import SignUpButton from './buttons/signup';
import ContactsButton from './buttons/contacts';
import UserProfileButton from './buttons/user-profile';


export default function Nav() {

	const { data: session } = useSession();

	return (
		<nav className={navStyles.nav} >
			<ul className={navStyles.container}>
				<li>
					<HomeButton />
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
						<li>
							<LogoutButton />
						</li>
						<li>
							<UserProfileButton
								content={session.user?.name}
							/>
						</li>
					</>
				) : (
					<>
						<li>
							<LoginButton />
						</li>
						<li>
							<SignUpButton />
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}