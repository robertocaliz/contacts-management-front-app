'use client';

import utilsStyles from '@/../styles/nav.module.css';
import { useSession } from "next-auth/react";
import {
	ContactsButton, HomeButton, LoginButton, LogoutButton, SignUpButton, ButtonProfile
} from "./buttons.component";


export default function Nav() {

	const { data: session } = useSession();

	console.log(session);

	return (
		<nav className={utilsStyles.nav} >
			<section>
				<ul>
					<li>
						<HomeButton />
					</li>

					{session && (
						<li>
							<ContactsButton />
						</li>
					)}

				</ul>
			</section>
			<section style={{ paddingRight: '2rem' }}>
				<ul>
					{session ? (
						<>
							<li><LogoutButton /></li>
							<li><ButtonProfile content={session.user?.name as string} /></li>
						</>
					) : (
						<>
							<li><LoginButton /></li>
							<li><SignUpButton /></li>
						</>
					)}
				</ul>
			</section>
		</nav>
	);
}