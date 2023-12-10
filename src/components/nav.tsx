'use client';

import navStyles from '@/../styles/nav.module.css';
import { useSession } from 'next-auth/react';
import HomeButton from './buttons/home';
import LogoutButton from './buttons/logout';
import LoginButton from './buttons/login';
import SignUpButton from './buttons/signup';
import ContactsButton from './buttons/contacts';
import UserProfileButton from './buttons/user-profile';
import NavBar from './nav-bar';
import List from './list';


export default function Nav() {

	const { data: session } = useSession();

	return (
		<NavBar className={navStyles.nav} >
			<List className={navStyles.container}>
				<li>
					<HomeButton />
				</li>
				{session && (
					<li>
						<ContactsButton />
					</li>
				)}
			</List>
			<List className={navStyles.container}>
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
			</List>
		</NavBar>
	);
}